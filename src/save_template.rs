extern crate cassandra;
use self::cassandra::*;

static QUERY:&'static str = "INSERT INTO toolkit.templates (template_id, payload ) VALUES ( uuid() , ? );";
static CONTACT_POINTS:&'static str = "127.0.0.1";

pub fn save_template(payload: &str) {
    let mut cluster = CassCluster::new();
    cluster
        .set_contact_points(CONTACT_POINTS).unwrap()
        .set_load_balance_round_robin().unwrap();
    let session = CassSession::new().connect(&cluster).wait().unwrap();


    let mut statement = CassStatement::new(QUERY, 1);
    //try!(statement.bind_string(0, payload));
    statement.bind_string(0, payload);
    //Ok(try!(session.execute_statement(&statement).wait()));
    session.execute_statement(&statement).wait();

    session.close().wait().unwrap();
}
