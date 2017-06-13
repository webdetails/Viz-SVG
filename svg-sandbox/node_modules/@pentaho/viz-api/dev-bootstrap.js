(function(global) {
  var basePath = "node_modules/@pentaho/viz-api";

  var requireCfg = {paths: {}, shim: {}, map: {"*": {}}, bundles: {}, config: {}, packages: []};

  var useDebug = typeof document === "undefined" || document.location.href.indexOf("debug=true") > 0;
  var minSuffix = useDebug ? "" : ".min";
  var requirePaths = requireCfg.paths;
  var requireShim = requireCfg.shim;
  var requireMap = requireCfg.map;

  var requireTypes = requireCfg.config["pentaho/service"] || (requireCfg.config["pentaho/service"] = {});
  var requireTypeInfo = requireCfg.config["pentaho/typeInfo"] || (requireCfg.config["pentaho/typeInfo"] = {});

  // region Pentaho Web-Client Platform

  // Unfortunately, *mantle* already maps the "pentaho" id to "/js",
  // so the paths of all of the following sub-modules must be configured individually.
  // E.g. requirePaths["pentaho/util"] = basePath + "/pentaho/util";
  [
    "shim", "util", "lang",
    "i18n", "service", "data", "type", "typeInfo",
    "visual", "config", "context", "debug", "ccc"
  ].forEach(function(name) {
    requirePaths["pentaho/" + name] = basePath + "/pentaho/" + name;
  });

  requireTypes["pentaho/visual/config/vizApi.conf"] = "pentaho.config.spec.IRuleSet";

  // Named instances
  requireTypes["pentaho/config/impl/instanceOfAmdLoadedService"] = "pentaho.config.IService";

  requireTypeInfo["pentaho/type/instance"] = {alias: "instance"};
  requireTypeInfo["pentaho/type/value"] = {alias: "value", base: "instance"};
  requireTypeInfo["pentaho/type/property"] = {alias: "property", base: "instance"};
  requireTypeInfo["pentaho/type/list"] = {alias: "list", base: "value"};
  requireTypeInfo["pentaho/type/element"] = {alias: "element", base: "value"};
  requireTypeInfo["pentaho/type/refinement"] = {alias: "refinement", base: "value"};
  requireTypeInfo["pentaho/type/complex"] = {alias: "complex", base: "element"};
  requireTypeInfo["pentaho/type/application"] = {alias: "application", base: "complex"};
  requireTypeInfo["pentaho/type/model"] = {alias: "model", base: "complex"};
  requireTypeInfo["pentaho/type/simple"] = {alias: "simple", base: "element"};
  requireTypeInfo["pentaho/type/number"] = {alias: "number", base: "simple"};
  requireTypeInfo["pentaho/type/string"] = {alias: "string", base: "simple"};
  requireTypeInfo["pentaho/type/boolean"] = {alias: "boolean", base: "simple"};
  requireTypeInfo["pentaho/type/date"] = {alias: "date", base: "simple"};
  requireTypeInfo["pentaho/type/object"] = {alias: "object", base: "simple"};
  requireTypeInfo["pentaho/type/function"] = {alias: "function", base: "simple"};
  requireTypeInfo["pentaho/type/filter/abstract"] = {base: "complex"};
  requireTypeInfo["pentaho/type/filter/tree"] = {base: "pentaho/type/filter/abstract"};
  requireTypeInfo["pentaho/type/filter/or"] = {alias: "or", base: "pentaho/type/filter/tree"};
  requireTypeInfo["pentaho/type/filter/and"] = {alias: "and", base: "pentaho/type/filter/tree"};
  requireTypeInfo["pentaho/type/filter/not"] = {alias: "not", base: "pentaho/type/filter/abstract"};
  requireTypeInfo["pentaho/type/filter/property"] = {base: "pentaho/type/filter/abstract"};
  requireTypeInfo["pentaho/type/filter/isEqual"] = {alias: "=", base: "pentaho/type/filter/property"};
  requireTypeInfo["pentaho/type/filter/isIn"] = {alias: "in", base: "pentaho/type/filter/property"};

  requireTypeInfo["pentaho/visual/base"] = {base: "model"};
  requireTypeInfo["pentaho/visual/base/view"] = {
    base: "complex",
    props: {
      model: {type: "pentaho/visual/base"}
    }
  };

  // TODO: remove the following when `webcontext.js` already configures pentaho/context
  requireCfg.config["pentaho/context"] = {
    theme:  getVar("active_theme"),
    locale: getVar("SESSION_LOCALE"),
    user: {
      id:   getVar("SESSION_NAME"),
      home: getVar("HOME_FOLDER")
    },
    reservedChars: getVar("RESERVED_CHARS"),
    server: {
      url: getUrl()
    }
  };

  function getVar(name) {
    return global[name] || null;
  }
  function getUrl() {
    return getVar("FULL_QUALIFIED_URL") ||
           getVar("CONTEXT_PATH") ||
           getVar("SERVER_PROTOCOL");
  }
  // endregion

  // region Base AMD Plugins
  requirePaths["json"] = basePath + "/util/require-json/json";
  requirePaths["text"] = basePath + "/util/require-text/text";
  // Using `map` is important for use in r.js and correct AMD config of the other files of the package.
  // Placing the minSuffix in the path ensures building works well,
  // so that the resolved module id is the same in both debug and non-debug cases.
  if(minSuffix) {
    requirePaths["common-ui/util/require-css/css"] = basePath + "/util/require-css/css" + minSuffix;
  }
  requireMap["*"]["css"] = "common-ui/util/require-css/css";
  // endregion

  // region Metadata Model and Visualizations Packages
  function mapTheme(mid, themeRoot, themes) {
    var theme = (typeof active_theme !== "undefined") ? active_theme : null;
    if(!theme || themes.indexOf(theme) < 0) theme = themes[0];

    // e.g. "/theme" -> "/themes/crystal"
    requireMap["*"][mid + "/theme"] = mid + "/" + themeRoot + "/" + theme;
  }

  function registerViz(name) {
    requireTypes[name] = "pentaho/visual/base";
  }

  // Metadata Model Base Theme
  mapTheme("pentaho/type", "themes", ["crystal"]);

  // CCC Themes
  mapTheme("pentaho/visual/models", "themes", ["crystal", "sapphire", "onyx", "det"]);

  // sample/calc theme
  mapTheme("pentaho/visual/samples/calc", "themes", ["crystal"]);

  requireCfg.packages.push({"name": "pentaho/visual/base", "main": "model"});
  requireCfg.packages.push({"name": "pentaho/visual/samples/calc", "main": "model"});

  [
    // base visual
    "pentaho/visual/base",

    // calc viz
    "pentaho/visual/samples/calc",

    // ccc vizs
    "pentaho/visual/models/abstract",
    "pentaho/visual/models/cartesianAbstract",
    "pentaho/visual/models/categoricalContinuousAbstract",
    "pentaho/visual/models/barAbstract",
    "pentaho/visual/models/barNormalizedAbstract",
    "pentaho/visual/models/barHorizontal",
    "pentaho/visual/models/bar",
    "pentaho/visual/models/barStacked",
    "pentaho/visual/models/barStackedHorizontal",
    "pentaho/visual/models/barNormalized",
    "pentaho/visual/models/barNormalizedHorizontal",
    "pentaho/visual/models/barLine",
    "pentaho/visual/models/line",
    "pentaho/visual/models/pointAbstract",
    "pentaho/visual/models/metricDotAbstract",
    "pentaho/visual/models/areaStacked",
    "pentaho/visual/models/pie",
    "pentaho/visual/models/heatGrid",
    "pentaho/visual/models/sunburst",
    "pentaho/visual/models/donut",
    "pentaho/visual/models/scatter",
    "pentaho/visual/models/bubble"
  ].forEach(registerViz);
  // endregion

  // TODO: this should be removed from here, and to the GEO plugin's package.json
  // when it is possible to specify global maps or an option that achieves the same effect.
  requireMap["*"]["pentaho/visual/models/geoMap"] = "pentaho/geo/visual_${project.version}/model";
  requireMap["*"]["pentaho/geo/visual/map"] = "pentaho/geo/visual_${project.version}/view";

  // VizAPI actions
  requireTypeInfo["pentaho/visual/action/select"] = {alias: "select"};
  requireTypeInfo["pentaho/visual/action/execute"] = {alias: "execute"};

  requirePaths["pentaho/i18n"] = basePath + "/i18nMock";

  require.config(requireCfg);
})(window);
