import * as core from "@actions/core";
import axios from "axios";

(async function getFoundryContainerRegistry() {
  try {
    const accessToken =
      core.getInput("access-token") ?? process.env.FOUNDRY_ACCESS_TOKEN;
    const foundryUrl = core.getInput("foundry-url", {
      required: true,
    });

    core.info(`🤞 Discovering container registry for ${foundryUrl}`);
    const response = await axios.get<{ domain: string }>(
      `https://${foundryUrl}/artifacts/api/admin/container-registry`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const foundryContainerRegistryUrl = response.data.domain;
    core.info(
      `✅ Container registry discovered for ${foundryUrl}: ${foundryContainerRegistryUrl}`
    );

    core.setSecret(foundryContainerRegistryUrl);
    core.setOutput(
      "foundry-container-registry-url",
      foundryContainerRegistryUrl
    );
  } catch (error) {
    core.setFailed(`❌ Failed to get registry: ${error.message}`);
  }
})();
