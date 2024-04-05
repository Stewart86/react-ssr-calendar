{
  description = "Application packaged for React SSR Calendar";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachSystem ["x86_64-linux"]
    (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        devShells = {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs_20
              nodePackages_latest.pnpm
            ];
            shellHook = ''
              export PATH="$PWD/node_modules/.bin/:$PATH"
              export NODE_PATH=~/.npm-packages/lib/node_modules
            '';
          };
        };
      }
    );
}
