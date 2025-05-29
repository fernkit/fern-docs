export const installationContent = {
  title: "Installation",
  description: "Follow these steps to install Fern and its dependencies.",
  requirements: [
    "Emscripten SDK",
    "Modern C compiler (supporting C99 or later)",
    "Python 3 (for development server)",
    "Web browser with WebAssembly support"
  ],
  steps: [
    {
      title: "Step 1: Install Dependencies",
      description: "First, install the Emscripten SDK which is required to compile C/C++ code to WebAssembly",
      code: `# Install Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh`
    },
    {
      title: "Step 2: Install Fern CLI",
      description: "Next, install the Fern CLI tool which simplifies building and running Fern applications",
      code: `# Clone the repository
git clone https://github.com/RishiAhuja/fern.git
cd fern

# Make the CLI script executable
chmod +x fern-cli.sh

# Create a symbolic link to make it available system-wide
sudo ln -s $(pwd)/fern-cli.sh /usr/local/bin/fern

# Optional: Install the man page
sudo install -m 644 fern.1 /usr/local/share/man/man1/
sudo mandb`
    }
  ],
  verification: {
    description: "Verify your installation by running:",
    code: "fern --version",
    successMessage: "If everything is set up correctly, you should see the Fern CLI version number."
  },
  nextSteps: "Now that Fern is installed, you can move on to the Quick Start guide to create your first application."
};
