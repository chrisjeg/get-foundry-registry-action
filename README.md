# Get Foundry Container Registry Action

This GitHub Action discovers the container registry URL for a specified Foundry instance. It is designed to be used in workflows that require dynamic retrieval of Foundry container registry URLs for deployment or artifact publishing purposes.

## Prerequisites

Before you can use this action, you will need:

1. **Foundry Access Token**: An access token with permissions to access the Foundry container registry.
2. **Foundry URL**: The URL of your Foundry instance.

## Inputs

- `access-token` (optional): The access token for Foundry. If not provided, the action will attempt to use the `FOUNDRY_ACCESS_TOKEN` environment variable.
- `foundry-url` (required): The URL of the Foundry instance.

## Outputs

- `foundry-container-registry-url`: The discovered container registry URL for the specified Foundry instance.

## Usage

Here's an example of how to use this action in your workflow:

```yaml
jobs:
  discover-registry:
    runs-on: ubuntu-latest
    steps:
      - name: Get Foundry token
          id: foundry-token
          uses: chrisjeg/auth-to-foundry@v1
          with:
            foundry-url: ${{ secrets.FOUNDRY_INSTANCE }}
            client-id: ${{ secrets.FOUNDRY_CLIENT_ID }}
            client-secret: ${{ secrets.FOUNDRY_CLIENT_SECRET }}
            scope: "compass:edit"

      - name: Get container registry url
          id: get-container-registry
          uses: chrisjeg/get-foundry-registry-action@v1
          with:
            foundry-url: ${{ secrets.FOUNDRY_INSTANCE }}
            access-token: ${{ steps.foundry-token.outputs.access-token }}
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
