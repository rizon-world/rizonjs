#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
THIRD_PARTY_CONFIO_PROTO_DIR="$THIRD_PARTY_PROTO_DIR/confio"

ROOT_IBC_PROTO_DIR="./proto/ibc/ibc-go"
IBC_PROTO_DIR="$ROOT_IBC_PROTO_DIR/proto"

ROOT_RIZON_PROTO_DIR="./proto/rizon-world/rizon"
RIZON_PROTO_DIR="$ROOT_RIZON_PROTO_DIR/proto"

OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

protoc \
    --plugin="$(yarn bin protoc-gen-ts_proto)" \
    --ts_proto_out="$OUT_DIR" \
    --proto_path="$COSMOS_PROTO_DIR" \
    --proto_path="$THIRD_PARTY_CONFIO_PROTO_DIR" \
    --proto_path="$THIRD_PARTY_PROTO_DIR" \
    --proto_path="$RIZON_PROTO_DIR" \
    --proto_path="$IBC_PROTO_DIR" \
    --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
    "$COSMOS_PROTO_DIR/cosmos/auth/v1beta1/auth.proto" \
    "$COSMOS_PROTO_DIR/cosmos/auth/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/authz/v1beta1/authz.proto" \
    "$COSMOS_PROTO_DIR/cosmos/authz/v1beta1/event.proto" \
    "$COSMOS_PROTO_DIR/cosmos/authz/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/authz/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/authz.proto" \
    "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/bank.proto" \
    "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/base/abci/v1beta1/abci.proto" \
    "$COSMOS_PROTO_DIR/cosmos/base/query/v1beta1/pagination.proto" \
    "$COSMOS_PROTO_DIR/cosmos/base/tendermint/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto" \
    "$COSMOS_PROTO_DIR/cosmos/capability/v1beta1/capability.proto" \
    "$COSMOS_PROTO_DIR/cosmos/crypto/secp256k1/keys.proto" \
    "$COSMOS_PROTO_DIR/cosmos/crypto/multisig/v1beta1/multisig.proto" \
    "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/distribution.proto" \
    "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/feegrant/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/feegrant/v1beta1/feegrant.proto" \
    "$COSMOS_PROTO_DIR/cosmos/feegrant/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/gov.proto" \
    "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/mint/v1beta1/mint.proto" \
    "$COSMOS_PROTO_DIR/cosmos/mint/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/params/v1beta1/params.proto" \
    "$COSMOS_PROTO_DIR/cosmos/params/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/slashing/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/slashing/v1beta1/slashing.proto" \
    "$COSMOS_PROTO_DIR/cosmos/slashing/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/authz.proto" \
    "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/staking.proto" \
    "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/tx/signing/v1beta1/signing.proto" \
    "$COSMOS_PROTO_DIR/cosmos/tx/v1beta1/service.proto" \
    "$COSMOS_PROTO_DIR/cosmos/tx/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/upgrade/v1beta1/query.proto" \
    "$COSMOS_PROTO_DIR/cosmos/upgrade/v1beta1/upgrade.proto" \
    "$COSMOS_PROTO_DIR/cosmos/vesting/v1beta1/tx.proto" \
    "$COSMOS_PROTO_DIR/cosmos/vesting/v1beta1/vesting.proto" \
    "$IBC_PROTO_DIR/ibc/applications/transfer/v1/query.proto" \
    "$IBC_PROTO_DIR/ibc/applications/transfer/v1/transfer.proto" \
    "$IBC_PROTO_DIR/ibc/applications/transfer/v1/tx.proto" \
    "$IBC_PROTO_DIR/ibc/applications/transfer/v2/packet.proto" \
    "$IBC_PROTO_DIR/ibc/core/channel/v1/channel.proto" \
    "$IBC_PROTO_DIR/ibc/core/channel/v1/query.proto" \
    "$IBC_PROTO_DIR/ibc/core/channel/v1/tx.proto" \
    "$IBC_PROTO_DIR/ibc/core/client/v1/client.proto" \
    "$IBC_PROTO_DIR/ibc/core/client/v1/query.proto" \
    "$IBC_PROTO_DIR/ibc/core/client/v1/tx.proto" \
    "$IBC_PROTO_DIR/ibc/core/commitment/v1/commitment.proto" \
    "$IBC_PROTO_DIR/ibc/core/connection/v1/connection.proto" \
    "$IBC_PROTO_DIR/ibc/core/connection/v1/query.proto" \
    "$IBC_PROTO_DIR/ibc/core/connection/v1/tx.proto" \
    "$IBC_PROTO_DIR/ibc/core/port/v1/query.proto" \
    "$IBC_PROTO_DIR/ibc/lightclients/localhost/v1/localhost.proto" \
    "$IBC_PROTO_DIR/ibc/lightclients/solomachine/v1/solomachine.proto" \
    "$IBC_PROTO_DIR/ibc/lightclients/solomachine/v2/solomachine.proto" \
    "$IBC_PROTO_DIR/ibc/lightclients/tendermint/v1/tendermint.proto" \
    "$THIRD_PARTY_CONFIO_PROTO_DIR/proofs.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/abci/types.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/keys.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/proof.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/libs/bits/types.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/p2p/types.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/types/params.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/types/types.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/types/validator.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/types/evidence.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/types/block.proto" \
    "$THIRD_PARTY_PROTO_DIR/tendermint/version/types.proto" \
    "$RIZON_PROTO_DIR/tokenswap/tx.proto" \
    "$RIZON_PROTO_DIR/tokenswap/tokenswap.proto" \
    "$RIZON_PROTO_DIR/tokenswap/query.proto" \
    "$RIZON_PROTO_DIR/tokenswap/params.proto" \
    "$RIZON_PROTO_DIR/treasury/tx.proto" \
    "$RIZON_PROTO_DIR/treasury/treasury.proto" \
    "$RIZON_PROTO_DIR/treasury/query.proto" \
    "$RIZON_PROTO_DIR/treasury/params.proto"

# Remove unnecessary codec files
rm -rf \
    src/codec/cosmos_proto/ \
    src/codec/gogoproto/ \
    src/codec/google/api/ \
    src/codec/google/protobuf/descriptor.ts
