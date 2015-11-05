extern crate cassandra;
use self::cassandra::*;

static QUERY:&'static str = "SELECT distinct template_id FROM toolkit.templates;";
static CONTACT_POINTS:&'static str = "127.0.0.1";
static KEY:&'static str = "template_id";
static PAYLOAD:&'static str = "payload";

pub fn get_templates() -> String {
    let mut cluster = CassCluster::new();
    cluster
        .set_contact_points(CONTACT_POINTS).unwrap()
        .set_load_balance_round_robin().unwrap();
    let session = CassSession::new().connect(&cluster).wait().unwrap();


    let mut statement = CassStatement::new(QUERY,0);

    println!("statement {}", QUERY);
    let result = session.execute_statement(&statement).wait().unwrap();
    println!("executed");

    let mut keys= String::new();
    println!("{}",result);
    for row in result.iter() {
        keys.push_str(&*row.get_column_by_name(KEY).get_string().unwrap());
        keys.push(',');
    }
    keys.pop();

    session.close().wait().unwrap();

    return keys;
}
