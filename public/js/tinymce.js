/*
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-22 00:50:00
 * @LastEditTime: 2021-06-22 00:50:25
 * @LastEditors: yfye
 */
tinymce.init({
    selector: '#mytextarea',
    readonly: false,
    plugins: [
        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor codesample"
    ],

    toolbar1: "undo redo | cut copy paste | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
    toolbar2: " searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image media code codesample | inserttime preview | forecolor backcolor",
    toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

    menubar: true,
    toolbar_items_size: 'small',
    templates: [{
        title: 'Test template 1',
        content: 'Test 1'
    }, {
        title: 'Test template 2',
        content: 'Test 2'
    }],
    language: 'zh_CN',
    insert_button_items: 'image', // 此选项的值应该是用空格分隔的菜单项控件标识符列表，或者对于菜单分隔符
    // CONFIG: Paste
    paste_retain_style_properties: 'all',
    // word需要它
    paste_word_valid_elements: '[]', // 此选项使您能够配置特定于MS Office的有效_元素
    paste_data_images: true,// 粘贴的同时能把内容里的图片自动上传，非常强力的功能
    paste_convert_word_fake_lists: false,// 插入word文档需要该属性
    paste_webkit_styles: 'all', //此选项允许您指定在WebKit中粘贴时要保留的样式
    paste_merge_formats: true, //此选项启用粘贴插件的合并格式功能
    paste_auto_cleanup_on_paste: false, //
    nonbreaking_force_tab: true, // 此选项允许您在用户按下键盘tab键时强制TinyMCE插入三个实体
    file_brower_callback_type: 'media', // 此选项允许您使用空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
    file_picker_types: 'media',// 此选项允许您通过空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
    // CONFIG: Font
    fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px 36pt',
    // CONFIG: StyleSelect 样式
    style_formats: [
        {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
        },
        {
            title: '行高',
            items: [
                { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
                { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
                { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
                { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
                { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
            ]
        }
    ],
    tabfocus_elements: ':prev,:next',
    // Image
    imagetools_toolbar: 'editimage', // 图片控制的工具栏
    images_upload_handler: function (blobInfo, success, failure, progress) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'postAcceptor.php');

        xhr.upload.onprogress = function (e) {
            progress(e.loaded / e.total * 100);
        }

        xhr.onload = function () {
            var json;
            if (xhr.status == 403) {
                failure('HTTP Error: ' + xhr.status, { remove: true });
                return;
            }
            if (xhr.status < 200 || xhr.status >= 300) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }
            success(json.location);
        };

        xhr.onerror = function () {
            failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        }

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
    }
});