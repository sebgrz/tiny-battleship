FROM node:14
WORKDIR /app
COPY --from=tb-build /build/src/game-projection/node_modules /app/node_modules
# it's a workaround for lerna binding internal packages via symlinks
# which breaking is hierarchy - fix is to copy internal packages to node module manually
COPY --from=tb-build /build/libs/ /app/node_modules/@tb/
COPY --from=tb-build /build/src/game-projection/out /app/out
COPY --from=tb-build /build/wait-for-it.sh /app/wait-for-it.sh
CMD node out/index.js