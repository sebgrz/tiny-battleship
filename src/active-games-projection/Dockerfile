FROM node:14 as build
WORKDIR /build
COPY . /build/
RUN  npm install -g lerna \
    && npm ci \
    && ./proto-gen.sh
RUN lerna bootstrap \
    && lerna run build

FROM node:14
WORKDIR /app
COPY --from=build /build/src/active-games-projection/node_modules /app/node_modules
# it's a workaround for lerna binding internal packages via symlinks
# which breaking is hierarchy - fix is to copy internal packages to node module manually
COPY --from=build /build/src/ /app/node_modules/@tb/
COPY --from=build /build/src/active-games-projection/out /app/out
COPY --from=build /build/wait-for-it.sh /app/wait-for-it.sh
CMD node out/index.js