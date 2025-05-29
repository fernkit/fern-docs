export const cppSignalSlotContent = {
  title: "Signal/Slot System (C++)",
  description: "Type-safe event handling system for interactive applications",
  intro: {
    title: "Understanding Signals and Slots",
    content: `Signals and slots are a type-safe implementation of the observer pattern, allowing objects 
    to communicate without being tightly coupled. This system is inspired by Qt's signal-slot mechanism 
    and provides a clean way to handle events, user interactions, and application state changes.`,
    
    whyItMatters: `Traditional callback systems often require tight coupling between components and can be 
    error-prone with function pointers. Signals and slots solve this by providing type safety, automatic 
    connection management, and the ability to connect multiple listeners to a single event.`
  },
  
  sections: [
    {
      id: "basic-signals",
      title: "Basic Signal Usage",
      description: "Understanding how to create and use signals for event communication.",
      explanation: `A signal is essentially a type-safe event that can be emitted by one object and 
      listened to by others. When you emit a signal, all connected slot functions are automatically 
      called with the provided parameters.`,
      
      howItWorks: `Signals use C++ templates to ensure type safety. When you declare Signal<int, string>, 
      the compiler ensures that only functions accepting int and string parameters can be connected to it. 
      This prevents runtime errors from mismatched function signatures.`,
      
      code: {
        declaration: `// Declaring signals in a class
class GameEngine {
private:
    // Signal with no parameters
    Signal<> onGameStart;
    
    // Signal with one parameter  
    Signal<int> onScoreChanged;
    
    // Signal with multiple parameters
    Signal<int, int> onPlayerMoved;
    
    // Signal with complex types
    Signal<const std::string&, bool> onMessageReceived;
    
public:
    // Getter methods to access signals (recommended pattern)
    Signal<>& getGameStartSignal() { return onGameStart; }
    Signal<int>& getScoreChangedSignal() { return onScoreChanged; }
    Signal<int, int>& getPlayerMovedSignal() { return onPlayerMoved; }
    
    // Methods that emit signals
    void startGame() {
        // Game initialization logic...
        onGameStart.emit();  // Notify all listeners
    }
    
    void updateScore(int newScore) {
        // Score update logic...
        onScoreChanged.emit(newScore);  // Pass the new score to listeners
    }
    
    void movePlayer(int x, int y) {
        // Player movement logic...
        onPlayerMoved.emit(x, y);  // Pass coordinates to listeners
    }
};`,

        basicConnection: `// Connecting to signals
GameEngine engine;

// Connect to a signal with no parameters using lambda
engine.getGameStartSignal().connect([]() {
    std::cout << "Game has started!" << std::endl;
});

// Connect to a signal with parameters
engine.getScoreChangedSignal().connect([](int score) {
    std::cout << "Score updated to: " << score << std::endl;
});

// Connect to a signal with multiple parameters
engine.getPlayerMovedSignal().connect([](int x, int y) {
    std::cout << "Player moved to (" << x << ", " << y << ")" << std::endl;
});

// Now when we call engine methods, the connected functions will be called
engine.startGame();        // Prints: "Game has started!"
engine.updateScore(100);   // Prints: "Score updated to: 100"
engine.movePlayer(50, 75); // Prints: "Player moved to (50, 75)"`
      }
    },
    
    {
      id: "advanced-connections",
      title: "Advanced Connection Patterns",
      description: "Different ways to connect signals to functions, methods, and objects.",
      explanation: `Signals can connect to various types of callable objects: lambda functions, free functions, 
      member functions, and function objects. This flexibility allows you to structure your event handling 
      in the way that best fits your application architecture.`,
      
      code: {
        lambdaConnections: `// Lambda functions (most common and flexible)
button->onClick.connect([]() {
    std::cout << "Button clicked!" << std::endl;
});

// Lambda with captures (accessing local variables)
int clickCount = 0;
button->onClick.connect([&clickCount]() {
    clickCount++;
    std::cout << "Button clicked " << clickCount << " times!" << std::endl;
});

// Lambda with parameters
scoreDisplay->onScoreChanged.connect([](int newScore) {
    if (newScore > 1000) {
        std::cout << "High score achieved: " << newScore << std::endl;
    }
});`,

        freeFunctionConnections: `// Free functions
void onButtonClick() {
    std::cout << "Free function called!" << std::endl;
}

void onScoreUpdate(int score) {
    std::cout << "Score: " << score << std::endl;
}

// Connect to free functions
button->onClick.connect(onButtonClick);
scoreManager->onScoreChanged.connect(onScoreUpdate);`,

        memberFunctionConnections: `// Member functions using std::bind
class UIManager {
public:
    void handleButtonClick() {
        std::cout << "UIManager handling button click" << std::endl;
    }
    
    void handleScoreChange(int score) {
        updateScoreDisplay(score);
    }
    
private:
    void updateScoreDisplay(int score) {
        // Update UI elements...
    }
};

UIManager uiManager;

// Connect to member functions
button->onClick.connect(std::bind(&UIManager::handleButtonClick, &uiManager));
scoreManager->onScoreChanged.connect(
    std::bind(&UIManager::handleScoreChange, &uiManager, std::placeholders::_1)
);`,

        multipleConnections: `// Multiple functions can connect to the same signal
Signal<int> onHealthChanged;

// Connect multiple listeners
onHealthChanged.connect([](int health) {
    std::cout << "Health UI updated: " << health << std::endl;
});

onHealthChanged.connect([](int health) {
    if (health <= 0) {
        std::cout << "Game over!" << std::endl;
    }
});

onHealthChanged.connect([](int health) {
    if (health < 20) {
        std::cout << "Warning: Low health!" << std::endl;
    }
});

// When emitted, all three functions will be called
onHealthChanged.emit(15);  
// Output:
// Health UI updated: 15
// Warning: Low health!`
      }
    },
    
    {
      id: "practical-examples",
      title: "Practical Application Examples",
      description: "Real-world examples of using signals and slots in Fern applications.",
      explanation: `Here are comprehensive examples showing how to use signals and slots to create 
      interactive, well-structured applications. These patterns can be adapted for games, tools, 
      visualizations, and other interactive software.`,
      
      code: {
        buttonExample: `// Complete interactive button example
class InteractiveApp {
private:
    std::shared_ptr<Button> incrementButton;
    std::shared_ptr<Button> decrementButton;
    std::shared_ptr<Button> resetButton;
    std::shared_ptr<Text> counterDisplay;
    int counter = 0;
    
public:
    void setupUI() {
        // Create buttons
        ButtonConfig incConfig = {
            .x = 100, .y = 200, .width = 120, .height = 40,
            .normalColor = Colors::Blue, .hoverColor = Colors::LightBlue,
            .label = "INCREMENT", .textColor = Colors::White
        };
        incrementButton = Button(incConfig);
        
        ButtonConfig decConfig = {
            .x = 240, .y = 200, .width = 120, .height = 40,
            .normalColor = Colors::Red, .hoverColor = Colors::LightRed,
            .label = "DECREMENT", .textColor = Colors::White
        };
        decrementButton = Button(decConfig);
        
        ButtonConfig resetConfig = {
            .x = 380, .y = 200, .width = 100, .height = 40,
            .normalColor = Colors::Gray, .hoverColor = Colors::LightGray,
            .label = "RESET", .textColor = Colors::White
        };
        resetButton = Button(resetConfig);
        
        // Create counter display
        counterDisplay = Text(Point(250, 150), "Counter: 0", 3, Colors::White);
        
        // Connect button signals to handler functions
        incrementButton->onClick.connect([this]() {
            counter++;
            updateCounterDisplay();
        });
        
        decrementButton->onClick.connect([this]() {
            counter--;
            updateCounterDisplay();
        });
        
        resetButton->onClick.connect([this]() {
            counter = 0;
            updateCounterDisplay();
        });
    }
    
private:
    void updateCounterDisplay() {
        counterDisplay->setText("Counter: " + std::to_string(counter));
    }
};`,

        gameExample: `// Game state management with signals
class GameManager {
private:
    Signal<int> onScoreChanged;
    Signal<int> onLivesChanged;
    Signal<bool> onGameStateChanged;  // true = running, false = game over
    
    int score = 0;
    int lives = 3;
    bool gameRunning = true;
    
public:
    // Provide access to signals
    Signal<int>& getScoreSignal() { return onScoreChanged; }
    Signal<int>& getLivesSignal() { return onLivesChanged; }
    Signal<bool>& getGameStateSignal() { return onGameStateChanged; }
    
    void addScore(int points) {
        if (!gameRunning) return;
        
        score += points;
        onScoreChanged.emit(score);
        
        // Check for achievements
        if (score % 1000 == 0) {
            std::cout << "Achievement: " << score << " points!" << std::endl;
        }
    }
    
    void loseLife() {
        if (!gameRunning) return;
        
        lives--;
        onLivesChanged.emit(lives);
        
        if (lives <= 0) {
            gameRunning = false;
            onGameStateChanged.emit(false);
        }
    }
    
    void resetGame() {
        score = 0;
        lives = 3;
        gameRunning = true;
        
        // Emit all state changes
        onScoreChanged.emit(score);
        onLivesChanged.emit(lives);
        onGameStateChanged.emit(true);
    }
};

// UI that responds to game state
class GameUI {
private:
    std::shared_ptr<Text> scoreText;
    std::shared_ptr<Text> livesText;
    std::shared_ptr<Text> gameOverText;
    
public:
    void connectToGameManager(GameManager& gameManager) {
        // Connect UI updates to game state changes
        gameManager.getScoreSignal().connect([this](int score) {
            scoreText->setText("Score: " + std::to_string(score));
        });
        
        gameManager.getLivesSignal().connect([this](int lives) {
            livesText->setText("Lives: " + std::to_string(lives));
            
            // Change color based on lives remaining
            if (lives <= 1) {
                livesText->setColor(Colors::Red);
            } else if (lives == 2) {
                livesText->setColor(Colors::Yellow);
            } else {
                livesText->setColor(Colors::Green);
            }
        });
        
        gameManager.getGameStateSignal().connect([this](bool running) {
            gameOverText->setVisible(!running);
            if (!running) {
                gameOverText->setText("GAME OVER - Press R to restart");
            }
        });
    }
};`,

        dataVisualization: `// Data visualization with signals
class DataProcessor {
private:
    Signal<std::vector<float>> onDataUpdated;
    Signal<float> onAverageCalculated;
    Signal<std::string> onStatusChanged;
    
    std::vector<float> data;
    
public:
    Signal<std::vector<float>>& getDataSignal() { return onDataUpdated; }
    Signal<float>& getAverageSignal() { return onAverageCalculated; }
    Signal<std::string>& getStatusSignal() { return onStatusChanged; }
    
    void addDataPoint(float value) {
        data.push_back(value);
        
        // Emit updated data
        onDataUpdated.emit(data);
        
        // Calculate and emit new average
        float sum = 0;
        for (float val : data) sum += val;
        float average = sum / data.size();
        onAverageCalculated.emit(average);
        
        // Update status
        onStatusChanged.emit("Data points: " + std::to_string(data.size()));
    }
    
    void clearData() {
        data.clear();
        onDataUpdated.emit(data);
        onAverageCalculated.emit(0.0f);
        onStatusChanged.emit("Data cleared");
    }
};

class DataVisualizer {
public:
    void connectToProcessor(DataProcessor& processor) {
        // Visualize data points
        processor.getDataSignal().connect([](const std::vector<float>& data) {
            // Clear previous visualization
            Draw::fill(Colors::Black);
            
            // Draw each data point as a bar
            for (size_t i = 0; i < data.size(); ++i) {
                int x = 50 + i * 10;
                int height = (int)(data[i] * 2);  // Scale for visibility
                Draw::rect(x, 300 - height, 8, height, Colors::Blue);
            }
        });
        
        // Display average as a line
        processor.getAverageSignal().connect([](float average) {
            int lineY = 300 - (int)(average * 2);
            Draw::line(50, lineY, 750, lineY, 2, Colors::Red);
        });
        
        // Show status text
        processor.getStatusSignal().connect([](const std::string& status) {
            Draw::text(status, 50, 50, 2, Colors::White);
        });
    }
};`
      }
    },
    
    {
      id: "connection-management",
      title: "Connection Management",
      description: "How to properly manage signal connections and avoid memory leaks.",
      explanation: `In complex applications, you need to manage signal connections carefully to avoid 
      memory leaks and dangling references. Fern provides tools for disconnecting signals and managing 
      connection lifetimes.`,
      
      code: {
        connectionHandles: `// Managing connections with handles
class TemporaryWidget {
private:
    Connection scoreConnection;
    Connection buttonConnection;
    
public:
    void connectToSignals(GameManager& game, Button& button) {
        // Store connection handles
        scoreConnection = game.getScoreSignal().connect([this](int score) {
            // Handle score update
        });
        
        buttonConnection = button.onClick.connect([this]() {
            // Handle button click
        });
    }
    
    ~TemporaryWidget() {
        // Disconnect when widget is destroyed
        scoreConnection.disconnect();
        buttonConnection.disconnect();
    }
};`,

        scopedConnections: `// Using RAII for automatic connection management
class ScopedEventHandler {
private:
    std::vector<Connection> connections;
    
public:
    template<typename Signal, typename Slot>
    void connect(Signal& signal, Slot&& slot) {
        connections.push_back(signal.connect(std::forward<Slot>(slot)));
    }
    
    ~ScopedEventHandler() {
        // Automatically disconnect all connections
        for (auto& conn : connections) {
            conn.disconnect();
        }
    }
};

// Usage:
void setupTemporaryHandlers() {
    ScopedEventHandler handler;
    
    handler.connect(button->onClick, []() {
        std::cout << "Temporary handler" << std::endl;
    });
    
    handler.connect(gameManager.getScoreSignal(), [](int score) {
        std::cout << "Temporary score handler: " << score << std::endl;
    });
    
    // All connections automatically cleaned up when handler goes out of scope
}`
      }
    }
  ],
  
  bestPractices: [
    {
      practice: "Use Lambda Functions for Simple Handlers",
      explanation: "Lambda functions are the most convenient way to connect to signals, especially for simple operations.",
      example: "button->onClick.connect([]() { std::cout << \"Clicked!\"; });"
    },
    {
      practice: "Capture by Reference Carefully",
      explanation: "When capturing variables in lambdas, ensure the captured objects outlive the signal connection.",
      example: "Use [&] only when you're sure the captured objects won't be destroyed before disconnection."
    },
    {
      practice: "Store Connection Handles for Cleanup",
      explanation: "Store Connection objects returned by connect() so you can disconnect them later.",
      example: "auto conn = signal.connect(handler); // Later: conn.disconnect();"
    },
    {
      practice: "Use Signals for State Changes",
      explanation: "Emit signals whenever important state changes occur in your application.",
      example: "Game score changes, UI state transitions, data updates, etc."
    },
    {
      practice: "Keep Signal Parameters Simple",
      explanation: "Use simple parameter types for signals to avoid copying large objects.",
      example: "Pass const references for complex types: Signal<const std::vector<int>&>"
    }
  ],
  
  commonPatterns: [
    {
      pattern: "Model-View-Controller",
      description: "Use signals to decouple model updates from view updates",
      implementation: "Model emits signals when data changes, view connects to these signals to update display"
    },
    {
      pattern: "Event Bus",
      description: "Central object that receives and redistributes events",
      implementation: "All components connect to a central EventBus that routes events between systems"
    },
    {
      pattern: "State Machine",
      description: "Use signals to notify of state transitions",
      implementation: "State objects emit signals when transitioning, allowing other systems to react"
    },
    {
      pattern: "Observer Pattern",
      description: "Multiple objects observe changes in a single subject",
      implementation: "Subject emits signals, multiple observers connect to receive notifications"
    }
  ]
};
