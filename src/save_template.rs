extern crate cassandra;
use self::cassandra::*;

static QUERY:&'static str = "INSERT INTO toolkit.templates (template_id, payload ) VALUES ( ? , ? );";
static CONTACT_POINTS:&'static str = "127.0.0.1";

pub fn save_template(template_id: &str, payload: &str) {
    let mut cluster = CassCluster::new();
    cluster
        .set_contact_points(CONTACT_POINTS).unwrap()
        .set_load_balance_round_robin().unwrap();
    let session = CassSession::new().connect(&cluster).wait().unwrap();


    let mut statement = CassStatement::new(QUERY, 2);
    //try!(statement.bind_string(0, payload));
    statement.bind_string(0, template_id);
    statement.bind_string(1, payload);

    //Ok(try!(session.execute_statement(&statement).wait()));
    session.execute_statement(&statement).wait();

    session.close().wait().unwrap();
}
