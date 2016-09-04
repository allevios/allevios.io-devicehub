#!/bin/sh

openssl req -new \
  -config ./software-ca.conf \
  -out ca/software-ca.csr \
  -keyout ca/software-ca/private/software-ca.key

openssl ca \
  -config ./root-ca.conf \
  -in ca/software-ca.csr \
  -out ca/software-ca.crt \
  -extensions signing_ca_ext

openssl ca -gencrl \
  -config ./software-ca.conf \
  -out crl/software-ca.crl

cat ca/software-ca.crt ca/root-ca.crt > \
  ca/software-ca-chain.pem

