function BaiduPoint(lng, lat, dis, label, id, onclick, onDrag){
    var ret = {
        point: null,
        circle: null,
        label: null,
        marker: null,
        cbclick: null,
        cbDrag: null,
        myid: null,
    };
    if (lat && lng) {
        ret.point = new BMap.Point(lng, lat);

        if (dis) {
            ret.circle = new BMap.Circle(ret.point, dis);
            ret.circle.setStrokeColor("#0033CC");
            ret.circle.setStrokeOpacity(0.7);
            ret.circle.setStrokeWeight(3);
            ret.circle.setFillColor("#0066B2");
            ret.circle.setFillOpacity(0.7);
        }

        ret.myid = id;

        ret.marker = new BMap.Marker(ret.point);
        ret.marker.setTitle(PointDefaultTitle(lng, lat));


        if (label) {
            ret.label = label;
            ret.marker.setLabel(new BMap.Label(label, { offset: new BMap.Size(20, -10) }));
        }

        if (onclick){
            ret.cbclick = onclick;
            ret.marker.addEventListener("click", PointDefaultClick);
        }

        if (onDrag){
            ret.cbDrag = onDrag;
            ret.marker.addEventListener("dragend", PointDefaultDrag);
        }
    }
    return ret;
}

function PointDefaultTitle(lng, lat){
    return "经: " + lng + ", 纬: " + lat;
}

function PointDefaultClick(e, point){
    console.log(e.point.lng, e.point.lat);
    if (point.cbclick){
        point.cbclick(e, point);
    }
}


function PointDefaultDrag(e, point){
    console.log(e.point.lng, e.point.lat);
    point.point.lng = e.point.lng;
    point.point.lat = e.point.lat;
    SetPointTitle(point, PointDefaultTitle(e.point.lng, e.point.lat));
    if (point.cbDrag){
        point.cbDrag(e, point);
    }
}



function SetPointLabel(point, label){
    if (!point || !point.marker){
        return ;
    }

    point.marker.setLabel(new BMap.Label(point.label, { offset: new BMap.Size(20, -10) }));
}

function SetPointTitle(point, title){
    if (!point || !point.marker){
        return ;
    }

    point.marker.setTitle(title);
}

function SetPointDrag(point, b){
    if (!point || !point.marker){
        return ;
    }
    if (b){
        point.marker.enableDragging();
    }
    else {
        point.marker.disableDragging();
    }
}

function SetPointJump(point, b){
    if (!point || !point.marker){
        return;
    }
    point.marker.setAnimation(b?BMAP_ANIMATION_BOUNCE:null);
}


const BasePoint = {
    CreatePoint: BaiduPoint,
    SetLabel: SetPointLabel,
    SetTitle: SetPointTitle,
    EnableDrag: SetPointDrag,
    EnableJump: SetPointJump,
};

export default BasePoint;



