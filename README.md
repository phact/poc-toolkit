# poc-toolkit

Pre-req -- you must have a cassandra instance running on localhost and you must have built the c++ driver per the cassandra-rs README:

https://github.com/phact/cassandra-rs/tree/phact-readme-update

To run this thing follow these steps


1) install rust

    $ curl -sSf https://static.rust-lang.org/rustup.sh | sh

2) clone and build
    
    $ git clone https://github.com/phact/poc-toolkit.git

    $ cargo build

3) run the binary

    $ target/debug/se-toolkit
   
Hit your browser on localhost port 8080 
