#!/bin/bash

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

${GRPC_TOOLS_NODE_PROTOC} \
    --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
    --js_out=import_style=commonjs,binary:"src/commons/lib/protos-gen" \
    -I src/protos/ \
    src/protos/*.proto

${GRPC_TOOLS_NODE_PROTOC} \
    --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
    --ts_out="src/commons/lib/protos-gen" \
    -I src/protos/ \
    src/protos/*.proto