var doc = app.activeDocument;
var layers = getAllLayers(doc);
var revert_points = [];
for (var k = 0; k < layers.length; k++) {
    var activeLayer = layers[k];
    doc.activeLayer = activeLayer;
    var layerName = activeLayer.name;
    if (!doc.pathItems) {
        continue;
    }
    // alert(doc.pathItems.length);
    /** 只能处理一个图层只有一个路径 */
    for (var i = 0; i < doc.pathItems.length; i++) {
        var myPathItem = doc.pathItems[i];
        myPathItem.editable = true;
        // alert(myPathItem.subPathItems.length);
        for (var j = 0; j < myPathItem.subPathItems.length; j++) {
            var mySubPathItem = myPathItem.subPathItems[j];
            var len = mySubPathItem.pathPoints.length;
            mySubPathItem.editable = true;
            // var revert_points = [];
            for (var h = len - 1; h >= 0; h--) {
                revert_points[len - 1 - h] = mySubPathItem.pathPoints[h];
                // for (var key in mySubPathItem.pathPoints[h]) {
                //     alert(key);
                // }
            }
            // mySubPathItem.pathPoints = revert_points;
        }
    }
}

var docRef = app.documents.add(5000, 7000, 72, 'Simple Line');
// var myPathItem = docRef.pathItems.add('A Line', revert_points);
// myPathItem.strokePath(ToolType.BRUSH);

/** 获得没有子类的图层 */
function getAllLayers(doc) {
    var result = [];
    for (var k = 0; k < doc.layers.length; k++) {
        var activeLayer = doc.layers[k];
        if (!activeLayer.layers || !activeLayer.layers.length) {
            result.push(activeLayer);
        } else {
            result = result.concat(getAllLayers(activeLayer));
        }
    }
    return result;
}
