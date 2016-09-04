#!/bin/sh

openssl req -new  \
  -config ./root-ca.conf \
  -out ca/root-ca.csr \
  -keyout ca/root-ca/private/root-ca.key

openssl ca -selfsign \
  -config ./root-ca.conf \
  -in ca/root-ca.csr \
  -out ca/root-ca.crt \
  -extensions root_ca_ext \
  -enddate 20301231235959Z

openssl ca -gencrl \
  -config ./root-ca.conf \
  -out crl/root-ca.crl
