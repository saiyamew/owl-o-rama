# owl-o-rama
Owl-O-Rama API

Uses Google Cloud Functions to make a serverless API to provide owl pictures.
This is VERY WIP, YMMV, etc. To be honest I'm still learning as I go. 

V1 - Cloud Function that when you do a GET, it serves an owl from a local file (JSON object)
V2 - Allows you to GET and to POST to add an owl. Due to how Cloud Functions works the local file had to change to a file on a GCP bucket.
