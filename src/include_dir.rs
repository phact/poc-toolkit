use std::fs;
use std::path::Path;
use std::fs::File;
use std::io::Write;
use std::io::Read;

pub fn include_dir() {

    for entry in fs::read_dir(&Path::new("www/")).unwrap() {
        let entry = entry.unwrap();
        if !fs::metadata(&entry.path()).unwrap().is_dir() {

            //TODO: include_str! the  www directory
            let mut file = File::open(&Path::new(&entry.path())).unwrap();
            //let name_desc:&str = entry.path().as_path().to_str().unwrap();
            let name_desc:&'static str = "../www/index.html";
            //"../www/index.html".whatisthis();
            //name_desc.whatisthis();
            //println!("{}",name_desc);
            //include_str!("../www/index.html");
            //include_str!(name_desc);
        }



    }
}
