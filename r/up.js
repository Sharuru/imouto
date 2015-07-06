var UP = function ($) {
    if (!window.XMLHttpRequest || !window.FileReader)
        return;

    var
        _html = $('html'),
        pace = $('pace');


    if (!pace) {
        pace = $.D.m('pace');
        pace.id = 'pace';
        $.D.a(pace);
    }

    _html.ondragover = function (e) {
        e.preventDefault();
    };
    _html.ondrop = function (e) {
        e.preventDefault();
        handleFile(e.dataTransfer.files);
    };

    var handleFile = function (files) {
        if (files.length == 0) {
            return;
        }

        var
            now = 0, max = files.length,
            f = function () {

                var file = files[now];
                //console.log(file);
                if (file.type.indexOf('image') != 0) {
                    alert('这不是一个图像或音频！');
                    return;
                }
                if (!file.size > 2000000) {
                    alert('请上传小于2MB大小的图像！');
                    return;
                }

                var xhr = new XMLHttpRequest();
                if (xhr.upload)
                    xhr.upload.onprogress = function (e) {
                        $.css(pace, 'width:' + e.loaded / e.total * 100 + '%');
                    };

                // 文件上传成功或是失败
                xhr.onreadystatechange = function (e) {
                    if (xhr.readyState == 4) {

                        var I = $('textarea[name="text"]');

                        I.value += (I.value ? '\n' : '') + 'http://ww2.sinaimg.cn/large/' + xhr.responseText.match(/[\w]{24,32}/) + '\n';

                        I.onkeydown();

                        $.css(pace, 'width:0;');

                        //$.D.d(pace);

                        now++;

                        if (now >= max) {

                        } else {
                            f();
                        }
                    }
                };
                xhr.open('POST', 'http://x.mouto.org/wb/x.php?up&_r=' + Math.random(), 1);
                xhr.send(file);

            };
        f();
    };

}(iTorr);
