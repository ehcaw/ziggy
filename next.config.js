const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            // ...
            {
              from: "node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js",
              to: "static/chunks/[name][ext]",
            },
            {
              from: "node_modules/@ricky0123/vad-web/dist/*.onnx",
              to: "static/chunks/[name][ext]",
            },
            {
              from: "node_modules/onnxruntime-web/dist/*.wasm",
              to: "static/chunks/[name][ext]",
            },
          ],
        }),
      );
    }
    return config;
  },
};
