# choiceRoute

T 1.
  PORT=3001 node bin/www
T 2.
  yarn start

T 3. 
  nem2-cli transaction mosaic --mosaicname nzdc --namespacename choice --amount 1000000 --transferable --supplymutable --       divisibility 2 --duration  50 --profile choice

T 4.
  nem2-cli account info --address SCNV6D-ZMYA7P-CFSMSC-ZXLWPC-ML4Z2N-ZXYDEB-7XA2 --profile choice
