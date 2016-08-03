import * as fs from "fs";
import { download, install, load } from "./utils";
import * as _ from "lodash";
import * as consts from "./preset";

function create_project() {
    // create src and test folder
    try {
        fs.mkdirSync("src");
    } catch (e) {}
    try {
        fs.mkdirSync("test");
    } catch (e) {}

    // download initial files
    _.forEach(consts.new_files, download);

    // install additional packages
    install(consts.additional_pkgs);
}

function install_scripts() {
    let conf = load("./package.json");
    if (!conf.scripts) {
        conf.scripts = {};
    }

    _.merge(conf.scripts, consts.script_tmpl);
    fs.writeFileSync("./package.json", JSON.stringify(conf, null, 2));
}

function patch_project() {
    // download karma and tsc templates
    _.forEach(consts.files, download);

    // install packages
    install(consts.base_pkgs);
}


const is_new = process.env.NEW !== "";

if (is_new) {
    create_project();
}

install_scripts();
patch_project();
