requestScreenCapture();
sleep(1000);
toast("开始");
var fanhui = textContains("wO51JH").findOne();

var du = new Array();
var map = new Array();
var lu = new Array();
var cnt = 0;
for (i = 1; i < 50; i++) {
    du[i] = 0;
    map[i] = new Array();
    for (j = 1; j <= 50; j++)
        map[i][j] = 0;
}
var l = 221, u = 485, r = 855, d = 1119;
//var l = 110, u = 224, r = 429, d = 540; 模拟器的分辨率
var a = new Array();
var dx = (r - l) / 3, dy = (d - u) / 3;
for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
        a.push([l + dx * j, u + dy * i]);
    }
}

log(a);
log(a.length);

var b = new Array();
var g = new Array();
// swipe(l, u, r, d, 1);
for (i = 0; i < a.length; i++) {
    var tmp = new Array();
    for (j = i + 1; j < a.length; j++) {
        swipe(a[i][0], a[i][1], a[j][0], a[j][1], 1);
        sleep(100);
        var p = images.findColorEquals(captureScreen(), "#ff415c", a[j][0], a[j][1], 1, 1);
        //log(p);
        if (p) {
            tmp.push(j + 1);
            map[i + 1][j + 1]++;
            map[j + 1][i + 1]++;
            du[i + 1]++;
            du[j + 1]++;
            
        }
        back();
    }
    g.push(tmp);
}
log(g);

var start = 1;
for (i = 1; i <= 16; i++) {
    if (du[i] % 2 == 1) {
        start = i;
        break;
    }
}
Hierholzer(start);
var ans = new Array();

for (i = cnt; i >= 1; i--) {
    ans.push(lu[i]);
}
clicks(lu);
// a.push(123);
// log(a);
function back() {
    click(fanhui.bounds().centerX(), fanhui.bounds().centerY());
}

function Hierholzer(i) {
    var j = 1;
    while(j <= 16) {
        if (map[i][j] >= 1) {
            map[i][j]--;
            map[j][i]--;
            Hierholzer(j);
        }
        j++;
    }
    lu[++cnt] = i;
}

function clicks(dots) {
    threads.start(function() {
        swipe(a[dots[cnt] - 1][0], a[dots[cnt] - 1][1], a[dots[cnt - 1] - 1][0], a[dots[cnt - 1] - 1][1], 50);
        for(i=cnt-2;i>=1;i--) {
            press(a[dots[i] - 1][0], a[dots[i] - 1][1], 1);
        }
    })

}