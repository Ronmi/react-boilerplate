import { execSync } from "child_process";
import * as fs from "fs";
import * as https from "https";
import { concat, join } from "lodash";
import * as consts from "./preset";

function run(cmds: string) {
    console.log("running [" + cmds + "]");

    try {
        execSync(cmds);
    } catch (e) {
        console.error(e);
        throw(e);
    }
}

export function download(f: string): Promise<void> {
    return new Promise<void>((res, rej) => {
        let file = fs.createWriteStream(f);
        file.on("close", () => {
            console.log("Downloaded " + f);
            res();
        });
        https.get(consts.base_url + f, (r) => {
            r.pipe(file);
        }).on("error", (e: any) => {
            console.log("Failed to download " + f);
            rej(e);
        });
    });
}

function _install(cmd: string, action: string, flag: string, ...pkgs: string[]) {
    let cmds = concat([cmd, action, flag], pkgs);
    run(join(cmds, " "));
}

export function npmS(...pkgs: string[]) {
    _install("npm", "i", "-S", ...pkgs);
}

export function npmD(...pkgs: string[]) {
    _install("npm", "i", "-G", ...pkgs);
}

export function typings(flag: string, ...pkgs: string[]) {
    _install("./node_modules/.bin/typings", "i", flag, ...pkgs);
}

export function install(pkgs: consts.Pkgs) {
    if (pkgs.dev !== undefined) {
        npmD(...pkgs.dev);
    }
    if (pkgs.dep !== undefined) {
        npmS(...pkgs.dep);
    }
    if (pkgs.typings !== undefined) {
        for (let flag in pkgs.typings) {
            typings(flag, ...pkgs.typings[flag]);
        }
    }
}

export function load(f: string): any {
    let stat = fs.statSync(f);

    if (!stat.isFile()) throw "File not exist";

    return JSON.parse(fs.readFileSync(f, {encoding: "utf8"}));
}
