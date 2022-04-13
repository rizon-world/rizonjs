#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PROTO_DIR="./proto"

##
## Cosmos SDK
##
COSMOS_DIR="$PROTO_DIR/cosmos"
COSMOS_SDK_DIR="$COSMOS_DIR/cosmos-sdk"
COSMOS_ZIP_FILE="$COSMOS_DIR/tmp.zip"

# Init Cosmos REF
COSMOS_REF=${COSMOS_REF:-"master"}
COSMOS_SUFFIX=${COSMOS_REF}
[[ $COSMOS_SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && COSMOS_SUFFIX=${COSMOS_SUFFIX#v}

# Create the Cosmos dir
mkdir -p "$COSMOS_DIR"
echo $COSMOS_REF
# Download the Cosmos archive
wget -O "$COSMOS_ZIP_FILE" "https://github.com/cosmos/cosmos-sdk/archive/$COSMOS_REF.zip" "--no-check-certificate"
unzip "$COSMOS_ZIP_FILE" "*.proto" -d "$COSMOS_DIR"
mv "$COSMOS_SDK_DIR-$COSMOS_SUFFIX" "$COSMOS_SDK_DIR"
rm "$COSMOS_ZIP_FILE"

##
## IBC SDK
##

IBC_DIR="$PROTO_DIR/ibc"
IBC_SDK_DIR="$IBC_DIR/ibc-go"
IBC_ZIP_FILE="$IBC_DIR/tmp.zip"

# Init IBC REF
IBC_REF=${IBC_REF:-"main"}
IBC_SUFFIX=${IBC_REF}
[[ $IBC_SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && IBC_SUFFIX=${IBC_SUFFIX#v}

# Create the IBC dir
mkdir -p "$IBC_DIR"

# Download the IBC archive
wget -O "$IBC_ZIP_FILE" "https://github.com/cosmos/ibc-go/archive/$IBC_REF.zip" "--no-check-certificate"
unzip "$IBC_ZIP_FILE" "*.proto" -d "$IBC_DIR"
mv "$IBC_SDK_DIR-$IBC_SUFFIX" "$IBC_SDK_DIR"
rm "$IBC_ZIP_FILE"

##
## RIZON SDK
##

RIZON_DIR="$PROTO_DIR/rizon-world"
RIZON_SDK_DIR="$RIZON_DIR/rizon"
RIZON_ZIP_FILE="$RIZON_DIR/tmp.zip"

# Init RIZON REF
RIZON_REF=${RIZON_REF:-"master"}
RIZON_SUFFIX=${RIZON_REF//[\/]/-}
[[ $RIZON_SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && RIZON_SUFFIX=${RIZON_SUFFIX#v}

# Create the RIZON dir
mkdir -p "$RIZON_DIR"

# Download the beam archive
wget -O "$RIZON_ZIP_FILE" "https://github.com/rizon-world/rizon/archive/$RIZON_REF.zip" "--no-check-certificate"
unzip "$RIZON_ZIP_FILE" "*.proto" -d "$RIZON_DIR"
mv "$RIZON_SDK_DIR-$RIZON_SUFFIX" "$RIZON_SDK_DIR"
rm "$RIZON_ZIP_FILE"
