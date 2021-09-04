<?php
if(!empty($_GET['ajax'])){
    echo 1686243;

}
?>
<!DOCTYPE html>
<html lang="zh-hans">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" sizes="57x57" href="touch-icon-iphone.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />  
  <link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-ipad3-144.png" />
    <title>在线模拟器</title>
    <style>
html,body {margin: 0px;padding: 0px;background:#333;color:#fff}
#game-div{position: absolute;left: 0px;top: 0px;width: 100%;height: 100%;touch-action: none;-webkit-no-user-scalable:no;touch-action: none;-webkit-no-user-scalable:no;}
#gamelist{max-width:980px;margin:0px auto;}
#gamelist a{color:#fff;}
        #gamelist ul{list-style: none;padding:0px;margin:0px;display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content: center;width: 100%;overflow: hidden;}
        #gamelist img{display:block;width:100%;max-width:160px;}
        #gamelist li{text-align:center;width:160px;margin:5px auto;}
        #gamelist a{font-size:80%}
    </style>
</head>
<body>
<!--
文件后缀不要大写 会有未知错误
配置参考 https://www.emulatorjs.com/
支持ZIP 7Z(推荐) rar(只能老版 rar4)
EJS_core 定义核心类型
EJS_biosUrl 定义BIOS  如ps 街机 世嘉
EJS_onLoadState(回调函数) 当用户加载存档时触发事件,例如定义上传文件操作
function EJS_onLoadState(func){
    func(存档数据);
}
EJS_onSaveState({
    即时存档数据,即时存档时封面
}) 当用户储存存档时触发事件,例如下载存档
新版运行方式
-->    
<?php
if(empty($_GET['game'])){

?>
<div id="_gamelist" hidden>宝可梦 - 比卡超|gb
宝可梦 - 水晶版ckn|gb
第五次机器人大战|gb
拳王96|gb
三国英雄传 - 傲视天下|gb
三国英雄传 - 吞食天地|gb
勇者斗恶龙 - 怪兽仙境|gb
勇者斗恶龙I.II-星夜之幻修正|gb
携带电兽力量版|gb
携带电兽速度版|gb
农场物语GB3|gb
萨尔达传说1梦见岛|gb
第三次超级机器人大战SFC|snes
重装机兵(中文)|nes
火焰之纹章 - 暗黑龙与光之剑|nes
忍者龙剑坛2(中文)|nes
忍者龙剑坛3(中文)|nes
第二次机器人大战(中文)|nes
松鼠大战1|nes
魂斗罗6代|nes
Battletoads Double Dragon|nes
三目童子|nes
雪人兄弟|nes</div>
<div id="gamelist">
<ul>
<li>
	<script type="text/javascript">
        var cpro_id = "u6575786";
        
</script>
<script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/cm.js"></script></li>
</ul>
</div>
<script>
var m=document.querySelector('#_gamelist'),t = m.textContent.split('\n'),ul=document.querySelector('#gamelist').querySelector('ul');
for(var i=0;i<t.length;i++){
    if(!t[i] || t[i]=='\n') continue ;
    var v = t[i].split('|');
	let li = document.createElement('li');
    li.innerHTML= '<a href="/emulator/app/emujs/?game='+encodeURIComponent(v[0])+'.7z&cores='+v[1]+'"><img src="/emulator/app/emujs/roomimgs/'+v[0]+'.png">'+v[0]+'|'+v[1].toUpperCase()+'</a>';
	ul.appendChild(li);
}
    </script>
<?php
}else{
    $bios = "";
    $game = 'rooms/'.$_GET['game'].'';
    if(!is_file($game)){
        $game = $_GET['game'];
    }
    $cores = $_GET['cores'];
        switch($cores){
            case 'psx':
                $bios = 'bios/psx.7z';
            break;
            case 'arcade':
                $bios = 'bios/arcade.7z';
            break;
            case 'msx':
                $bios = 'bios/msx.7z';
            break;
            case 'sega':
                $bios = 'bios/sega.7z';
            break;
            case 'segaCD':
                $bios = 'bios/segacd.7z';
            break;
            case 'segaGG':
                $bios = 'bios/bios.gg';
            break;
        }
    
    if(empty($_GET['bios']) && $cores=='psx'){
        $bios = '';
        
    }

?>
<div id="game-div">
    <div id="game"></div>
    </div>
    <script type="text/javascript">
        const EJS_player = '#game',
              EJS_gameUrl = '<?php echo $game; ?>'; // Url to Game rom
              EJS_gameName = EJS_gameUrl.split('/').pop(),
              EJS_gameID = EJS_gameName.charCodeAt(0)+EJS_gameName.charCodeAt(2)+''+EJS_gameName.length, // ID in your website, required for netplay.
              EJS_core = '<?php echo $cores; ?>',
              EJS_biosUrl = '<?php echo $bios; ?>';// Url to Famicom Disk System bios
        </script>
<script src="Mylocalforage.js"></script>
<?php
}
?>

</body>
</html>