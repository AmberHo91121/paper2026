var KaoKaoNan;

async function startup({ id, version, rootURI }) {
  try {
    Services.console.logStringMessage("[KaoKaoNan] bootstrap startup() 開始");
    await Zotero.uiReadyPromise;
    const module = {};
    Services.scriptloader.loadSubScript(rootURI + "src/kaokaonan.js", module);
    KaoKaoNan = module.KaoKaoNan;
    KaoKaoNan.init({ id, version, rootURI });
  } catch (e) {
    Services.console.logStringMessage("[KaoKaoNan] startup 失敗: " + e);
  }
}

function shutdown() {
  if (KaoKaoNan) {
    KaoKaoNan.shutdown();
  }
  KaoKaoNan = undefined;
}

function install() {}

function uninstall() {}
