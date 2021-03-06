import * as fs from "fs";
import { download, install, load } from "./utils";
import { merge } from "lodash";
import * as consts from "./preset";

async function create_project() {
    // create src and test folder
    try {
        fs.mkdirSync("src");
    } catch (e) {}
    try {
        fs.mkdirSync("test");
    } catch (e) {}
    try {
        fs.mkdirSync("public");
    } catch (e) {}

    // download initial files
    await Promise.all(consts.new_files.map(download));

    // install additional packages
    install(consts.additional_pkgs);
}

function install_scripts() {
    let conf = load("./package.json");
    if (!conf.scripts) {
        conf.scripts = {};
    }

    merge(conf.scripts, consts.script_tmpl);
    fs.writeFileSync("./package.json", JSON.stringify(conf, null, 2));
}

async function patch_project() {
    // download karma and tsc templates
    await Promise.all(consts.files.map(download));

    // install packages
    install(consts.base_pkgs);
}


async function main() {
    const is_new = process.env.NEW !== undefined && process.env.NEW !== "";

    if (is_new) {
        await create_project();
    }

    install_scripts();
    await patch_project();
}

main().then(() => {
    console.log("Done.");
});
