extern crate cassandra;
use self::cassandra::*;

static QUERY:&'static str = "SELECT * FROM toolkit.templates where template_id= ?;";
static CONTACT_POINTS:&'static str = "127.0.0.1";
static KEY:&'static str = "template_id";
static PAYLOAD:&'static str = "payload";

pub fn read_template (key: &str) -> String {
    let mut cluster = CassCluster::new();
    cluster
        .set_contact_points(CONTACT_POINTS).unwrap()
        .set_load_balance_round_robin().unwrap();
    let session = CassSession::new().connect(&cluster).wait().unwrap();


    let mut statement = CassStatement::new(QUERY, 1);
    println!("heres my key {}",key);
    statement.bind_string(0, key);

    println!("statement {}", QUERY);
    let result = session.execute_statement(&statement).wait().unwrap();
    println!("executed");

    let mut payload = String::new();
    println!("{}",result);
    for row in result.iter() {
        println!("key = {}", row.get_column_by_name(KEY));
        payload = row.get_column_by_name(PAYLOAD).get_string().unwrap();
        println!("payload = {}", payload);
    }

    session.close().wait().unwrap();

    return payload;
}
