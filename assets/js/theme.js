// LERA
"use strict";

const theme = {
    init: () => {
        [].slice.call(document.querySelectorAll('#preloader')).forEach(item => {
            setTimeout(() => {
                item.style.visibility = 'hidden';
                item.style.opacity = '0';
            }, 350);
        }),
            [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function (e) {
                return new bootstrap.Tooltip(e)
            })),
            [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function (e) {
                return new bootstrap.Popover(e)
            })),
            [].slice.call(document.querySelectorAll('[data-bg-img-src]')).forEach(item => {
                const bgImage = item.getAttribute('data-bs-img-src')
                item.style.backgroundImage = `url(${bgImage})`
                item.removeAttribute('data-bs-img-src')
            }),
            [].slice.call(document.querySelectorAll('.img-load')).forEach(item => {
                const observer = lozad(item, {
                    threshold: 0.1,
                    enableAutoReload: true,
                    load: (el) => {
                        if (el.hasAttribute('data-src')) {
                            el.src = el.getAttribute('data-src')
                        } else if (el.hasAttribute('data-background-image')) {
                            el.style.backgroundImage = "url(" + el.getAttribute('data-background-image') + ")";
                            el.style.backgroundPosition = "center";
                        }
                    },
                    loaded: (el) => {
                        el.classList.remove('img-load')
                        if (el.hasAttribute('data-background-image')) {
                            el.removeAttribute('data-background-image')
                        } else if (el.hasAttribute('data-src')) {
                            el.removeAttribute('data-src')
                        }
                    }
                })
                observer.observe()
            }),
            [].slice.call(document.querySelectorAll('img')).forEach(item => {
                if (item.src.slice(0, 10) === 'data:image') {
                    item.classList.add('img-fluid')
                }
            }),
            [].slice.call(document.querySelectorAll('[data-href]')).forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e) {
                        e.preventDefault();
                    }
                    window.location = item.getAttribute('data-href');
                })
            }),
            [].slice.call(document.querySelectorAll('.btn-submit')).forEach(item => {
                theme.helpers.submitForm(item);
            }),
            [].slice.call(document.querySelectorAll('.toggle-settings')).forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e) {
                        e.preventDefault();
                    }
                    theme.helpers.toggleSidebarSettings();
                })
            }),
            [].slice.call(document.querySelectorAll('.btn-upload')).forEach(item => {
                const dataInput = document.getElementById(item.getAttribute('data-input')),
                    dataImage = document.getElementById(item.getAttribute('data-image')),
                    dataImageModal = document.getElementById(item.getAttribute('data-image-modal')),
                    dataModal = document.getElementById(item.getAttribute('data-modal')),
                    dataId = item.getAttribute('data-uid'),
                    dataHeight = item.getAttribute('data-height') ? item.getAttribute('data-height') : 0,
                    dataWidth = item.getAttribute('data-width') ? item.getAttribute('data-width') : 0,
                    dataRatio = item.getAttribute('data-ratio') ? item.getAttribute('data-ratio') : 1,
                    updateEl = item.getAttribute('data-update-el') ? item.getAttribute('data-update-el') : null,
                    isBackground = item.getAttribute('data-is-background') ? item.getAttribute('data-is-background') : false,
                    elProgressBar = item.getAttribute('data-el-progress-bar') ? document.getElementById(item.getAttribute('data-el-progress-bar')) : null,
                    dataPathUrl = item.getAttribute('data-path-url'),
                    saveTo = item.getAttribute('data-save-to') ? item.getAttribute('data-save-to') : null;
                let dict = new Map();
                dict.set("cover", 9 / 3);
                dict.set("avatar", 1);

                theme.helpers.uploadFile(item, dataImage, dataImageModal, dataInput,
                    dataModal, dict.get(dataRatio), dataHeight, dataWidth, dataId, dataPathUrl, updateEl, isBackground, elProgressBar, saveTo);
            }),
            [].slice.call(document.querySelectorAll('.input-length')).forEach(item => {
                theme.helpers.maximumInputLength(item);
            }),
            [].slice.call(document.querySelectorAll('.checkbox-wrapper-outer')).forEach(item => {
                item.addEventListener('click', (ev) => {
                    const others = document.getElementById(item.getAttribute('data-others')),
                        eleId = document.getElementById(item.getAttribute('data-ele-id')),
                        changeDisplay = item.getAttribute('data-change-display'),
                        pushDNone = item.getAttribute('data-ensure-d-none'),
                        condDNone = item.getAttribute('data-condition-d-none'),
                        targetEl = item.getAttribute('data-bs-target');

                    if (ev) {
                        jQuery('.django-select2').djangoSelect2('enable', true)
                        ev.preventDefault();
                    }

                    eleId.checked = true;
                    others.checked = !eleId.checked;

                    if (changeDisplay.length > 0) {
                        const changeDisplayArray = changeDisplay.split(',');
                        for (let i = 0; i < changeDisplayArray.length; i++) {
                            const changeEle = changeDisplayArray[i].trimStart();
                            document.getElementById(changeEle).classList.remove('d-none');
                        }
                    }
                    if (pushDNone.length > 0) {
                        const pushDNoneArray = pushDNone.split(','),
                            conditionArray = condDNone.split(',');
                        for (let i = 0; i < pushDNoneArray.length; i++) {
                            let pushDNoneEle = document.getElementById(pushDNoneArray[i].trimStart());
                            pushDNoneEle.classList.add('d-none');

                            if (condDNone.length > 0) {
                                for (let i = 0; i < conditionArray.length; i++) {
                                    let condDNoneEle = document.getElementById(conditionArray[i].trimStart());
                                    if (condDNoneEle.checked) {
                                        pushDNoneEle.classList.remove('d-none');
                                    } else {
                                        condDNoneEle.addEventListener('click', (ev) => {
                                            pushDNoneEle.classList.remove('d-none');
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
            }),
            [].slice.call(document.querySelectorAll('input[type="text"].form-filter')).forEach(item => {
                const frm = item.getAttribute('data-frm');
                item.addEventListener('keyup', (e) => {
                    setInterval(() => {
                        if (e) {
                            document.getElementById(frm).submit();
                            e.preventDefault();
                        }
                    }, 1000)
                });

                document.addEventListener("DOMContentLoaded", (event) => {
                    const length = item.value.length;
                    item.focus();
                    item.setSelectionRange(length, length);
                });
            }),
            [].slice.call(document.querySelectorAll('table tbody tr')).forEach(item => {
                item.ondblclick = () => {
                    window.location.href = item.getAttribute('data-id');
                }
            }),
            [].slice.call(document.querySelectorAll('input.text-prepend.is-invalid')).forEach(item => {
                const eleId = item.getAttribute('id'),
                    span = `span-${eleId}`;
                document.getElementById(span).classList.add('invalid');
            }),
            [].slice.call(document.querySelectorAll('.limited-input')).forEach(item => {
                const rgx = item.getAttribute('data-pattern');
                item.addEventListener('keyup', (e) => {
                    if (e) {
                        theme.helper.limitedInput(item, rgx)
                        e.preventDefault();
                    }
                })
            }),
            [].slice.call(document.querySelectorAll('.twit-style')).forEach(item => {
                const eleId = item.getAttribute('id'),
                    eleTarget = item.getAttribute('data-target-id'),
                    path = item.getAttribute('data-target-path');
                theme.helpers.twitStyle.init(eleId, eleTarget, path);
            }),
            [].slice.call(document.querySelectorAll('.need-validate')).forEach(item => {
                const id = item.getAttribute('id');
                theme.helpers.pristineValidate.init(id)
            }),
            [].slice.call(document.querySelectorAll('#navigation')).forEach(item => {
                let elements = item.getElementsByTagName('a');
                for (var i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', (e) => {
                        if (e.target.getAttribute('href') === "javascript:void(0)") {
                            let submenu = e.target.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    })
                }
            }),
            [].slice.call(document.querySelectorAll('.tiny-three-item')).map(item => {
                var slider = tns({
                    container: '.tiny-three-item',
                    controls: false,
                    mouseDrag: true,
                    loop: true,
                    rewind: true,
                    autoplay: true,
                    autoplayButtonOutput: false,
                    autoplayTimeout: 3000,
                    navPosition: "bottom",
                    speed: 400,
                    gutter: 12,
                    responsive: {
                        992: {
                            items: 3
                        },

                        767: {
                            items: 2
                        },

                        320: {
                            items: 1
                        },
                    },
                });
            }),
            [].slice.call(document.querySelectorAll('.tiny-team-slider')).map(item => {
                var slider = tns({
                    container: '.tiny-team-slider',
                    items: 1,
                    controls: true,
                    mouseDrag: true,
                    loop: true,
                    rewind: true,
                    autoplay: true,
                    autoplayButtonOutput: false,
                    autoplayTimeout: 3000,
                    navPosition: "bottom",
                    controlsText: ['<iconify-icon icon="rivet-icons:chevron-left" width="12" height="12"></iconify-icon>', '<iconify-icon icon="rivet-icons:chevron-right" width="12" height="12"></iconify-icon>'],
                    nav: false,
                    speed: 400,
                    gutter: 0,
                });
            }),
            [].slice.call(document.querySelectorAll('.counter-value')).forEach(item => {
                const speed = 2500;
                const updateCount = () => {
                    const target = +item.getAttribute('data-target');
                    const count = +item.innerText;

                    var inc = target / speed;
                    if (inc < 1) {
                        inc = 1;
                    }

                    if (count < target) {
                        item.innerText = (count + inc).toFixed(0);
                        setTimeout(updateCount, 1);
                    } else {
                        item.innerText = target;
                    }
                };
                updateCount();
            });
    },
    helpers: {
        numberWithCommas: (e) => {
            e = e.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(e))
                e = e.replace(pattern, "$1.$2");
            return e;
        },
        togglePassword: (el) => {
            el.addEventListener('click', (ev) => {
                if (ev) {
                    ev.preventDefault()
                }
                const passwordField = el.parentNode.firstElementChild,
                    icon = el.firstElementChild;
                if (icon.classList.contains('eye-open')) {
                    icon.classList.remove('eye-open');
                    icon.classList.add('eye-slash')
                } else {
                    icon.classList.remove('eye-slash');
                    icon.classList.add('eye-open')
                }
                passwordField.type === 'password' ? passwordField.type = 'text' : passwordField.type = 'password'
                passwordField.focus()
            })
        },
        uploadFile: (btn, avatar, image, input, $modal, ratio, tinggi, lebar, uid = null, urlpath, updateEl = [], is_background = false, elProgressBar = null, saveTo = null) => {
            var cropper, title, wImage, hImage;
            let btnUpload = $modal.firstElementChild.firstElementChild.lastElementChild.lastElementChild
            const myModal = new bootstrap.Modal($modal, {
                keyboard: false
            });

            btn.addEventListener('click', (ev) => {
                if (ev) {
                    ev.preventDefault()
                }

                title = btn.textContent
                input.click();
            })

            window.addEventListener('DOMContentLoaded', function () {
                input.addEventListener('change', function (e) {
                    var files = e.target.files;
                    var done = function (url) {
                        input.value = '';
                        image.src = url;
                        myModal.show();
                    };

                    var reader;
                    var file;

                    if (files && files.length > 0) {
                        file = files[0];

                        if (URL) {
                            done(URL.createObjectURL(file));
                        } else if (FileReader) {
                            reader = new FileReader();
                            reader.onload = function (e) {
                                done(reader.result);
                            };
                            reader.readAsDataURL(file);
                        }
                    }
                });
                $modal.addEventListener('shown.bs.modal', event => {
                    cropper = new Cropper(image, {
                        aspectRatio: ratio,
                        viewMode: 3,
                        mouseWheelZoom: false,
                        crop(event) {
                            wImage = event.detail.width;
                            hImage = event.detail.height;
                        }
                    });
                });

                $modal.addEventListener('hidden.bs.modal', event => {
                    cropper.destroy();
                    cropper = null;
                });

                btnUpload.addEventListener('click', function () {
                    var initialAvatarURL;
                    var canvas;

                    myModal.hide();

                    if (lebar !== 0) {
                        wImage = lebar
                    }
                    if (tinggi !== 0) {
                        hImage = tinggi
                    }

                    if (cropper) {
                        canvas = cropper.getCroppedCanvas({
                            width: wImage,
                            height: hImage,
                        });
                        if (!is_background) {
                            initialAvatarURL = avatar.src;
                            avatar.src = canvas.toDataURL();
                        }
                        if (elProgressBar != null) {
                            elProgressBar.style.display = 'block';
                        }

                        canvas.toBlob(function (blob) {
                            let blobData = new Blob([blob], {type: 'image/png'}),
                                csrftoken = ideajar.helpers.getCookie('csrftoken');

                            var formData = new FormData();
                            formData.append('foto', blobData, 'avatar.jpg');
                            if (uid !== null) {
                                formData.append('uid', uid);
                            }
                            if (saveTo !== null) {
                                formData.append('fieldname', saveTo);
                            }
                            $.ajax(urlpath, {
                                method: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                xhrFields: {
                                    withCredentials: true
                                },
                                headers: {
                                    // 'HTTP_X_REQUESTED_WITH': 'XMLHttpRequest',
                                    'X-CSRFToken': csrftoken,
                                },

                                xhr: function () {
                                    var xhr = new XMLHttpRequest();
                                    xhr.upload.onprogress = function (e) {
                                        var percent = '0';
                                        var percentage = '0%';

                                        if (e.lengthComputable) {
                                            percent = Math.round((e.loaded / e.total) * 100);
                                            percentage = percent + '%';
                                            // btn.textContent = "Upload ... " + percentage;
                                            if (elProgressBar != null) {
                                                elProgressBar.setAttribute('width', percentage);
                                                elProgressBar.setAttribute('aria-valuenow', percent);
                                            }
                                            // $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                                        }
                                    };

                                    return xhr;
                                },

                                success: function (d) {
                                    if (d.status) {
                                        btn.textContent = title
                                        if (is_background) {
                                            avatar.style.backgroundImage = "url(" + d.filename + ")"
                                        } else {
                                            avatar.src = `${d.filename}`
                                        }
                                        if (updateEl != null) {
                                            const updateEleArray = updateEl.split(',');
                                            for (let i = 0; i < updateEleArray.length; i++) {
                                                const updEle = document.getElementById(updateEleArray[i]);
                                                updEle.src = avatar.src;
                                                if (updEle.classList.contains('d-none')) {
                                                    updEle.classList.remove('d-none');
                                                }
                                            }
                                        }
                                    }
                                },

                                error: function (e) {
                                    if (!is_background) {
                                        avatar.src = initialAvatarURL;
                                    }
                                    console.log(e.responseText);
                                },

                                complete: function () {
                                    if (elProgressBar != null) {
                                        elProgressBar.style.display = 'none';
                                    }
                                },
                            });
                        });
                    }
                });
            });
        },
        getCookie: (name) => {
            let cookieValue = null;
            if (document.cookie && document.cookie !== "") {
                const cookies = document.cookie.split(";");
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + "=")) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },
        galeryGrid: (el, imgCls = null) => {
            const elem = document.querySelector(el);
            let msnry = new Masonry(elem, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                gutter: '.gutter-sizer',
                percentPosition: true
            });
            if (imgCls != null) {
                const observer = lozad(imgCls, {
                    threshold: 0.1,
                    enableAutoReload: true,
                    load: (el) => {
                        el.src = el.getAttribute('data-src')
                    },
                    loaded: (el) => {
                        el.removeAttribute('data-src');
                        msnry.layout();
                    }
                });
                observer.observe();
            }
        },
        toggleSidebarSettings: () => {
            document.body.classList.toggle('settings-open');
        },
        toggleMenu: () => {
            document.getElementById('isToggle').classList.toggle('open');
            const isOpen = document.getElementById('navigation');
            if (isOpen.style.display === 'block') {
                isOpen.style.display = 'none';
            } else {
                isOpen.style.display = 'block';
            }
        },
        getClosest: (ele, selector) => {
            if (!Element.prototype.matches) {
                Element.prototype.matches =
                    Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                            i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) {
                        }
                        return i > -1;
                    };
            }

            for (; ele && ele !== document; ele = ele.parentNode) {
                if (ele.matches(selector)) return ele;
            }
            return null;
        },
        activateMenu: () => {
            var menuItems = document.getElementsByClassName("sub-menu-item");
            if (menuItems) {

                var matchingMenuItem = null;
                for (var idx = 0; idx < menuItems.length; idx++) {
                    if (menuItems[idx].href === window.location.href) {
                        matchingMenuItem = menuItems[idx];
                    }
                }

                if (matchingMenuItem) {
                    matchingMenuItem.classList.add('active');
                    var immediateParent = theme.helpers.getClosest(matchingMenuItem, 'li');
                    if (immediateParent) {
                        immediateParent.classList.add('active');
                    }

                    var parent = theme.helpers.getClosest(matchingMenuItem, '.parent-menu-item');
                    if (parent) {
                        parent.classList.add('active');
                        var parentMenuitem = parent.querySelector('.menu-item');
                        if (parentMenuitem) {
                            parentMenuitem.classList.add('active');
                        }
                        var parentOfParent = theme.helpers.getClosest(parent, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    } else {
                        var parentOfParent = theme.helpers.getClosest(matchingMenuItem, '.parent-parent-menu-item');
                        if (parentOfParent) {
                            parentOfParent.classList.add('active');
                        }
                    }
                }
            }
        },
        avoidSpecialChars: function (evt) {
            let regex = /[^a-zA-Z0-9-. ]/g,
                twit = evt.value;
            evt.value = twit.replace(regex, "");
        },
        limitedInput: (evt, rgx) => {
            let regex = new RegExp(rgx, "i");
            //let regex = /[^0-9-. ]/g;
            let input = evt.value;
            evt.value = input.replace(regex, "");
        },
        twitStyle: {
            init: function (eleId, targetEleId, url) {
                const ele = document.getElementById(eleId),
                    targetEle = document.getElementById(targetEleId);

                ele.addEventListener('keyup', (ev) => {
                    if (ev) {
                        ideajar.helpers.avoidSpecialChars(ele);
                        ev.preventDefault();
                    }

                    sendTwit().catch(error => {
                        console.error(error);
                    });

                    async function sendTwit() {
                        var data = new FormData();
                        data.append("twit", ele.value);
                        await fetch(url,
                            {
                                method: "POST",
                                headers: {
                                    "X-CSRFToken": ideajar.helpers.getCookie('csrftoken'),
                                },
                                body: data
                            })
                            .then(function (res) {
                                return res.json();
                            })
                            .then(function (data) {
                                targetEle.textContent = ele.value.length === 0 ? "" : `@${data}`;
                            })
                    }
                });
            }
        },
        showAlert: (message) => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
            });

            Toast.fire({
                icon: message.tag,
                title: message.title,
                text: message.message
            })
        },
        adjustPrependPadding: (elem) => {
            const el = elem.firstElementChild,
                inputField = elem.querySelector('.form-control');
            if (el.classList.contains('prepend')) {
                const eleWidth = el.clientWidth + 3;
                inputField.style.paddingLeft = eleWidth + "px";
            }
        },
        justValidate: {
            init: function (selector, ele) {
                let form = document.getElementById(selector),
                    eleArray = ele.split(",");

                if (!form.hasAttribute('novalidate')) {
                    form.setAttribute('novalidate', 'true');
                }
                const validator = new window.JustValidate(form, {
                    validateBeforeSubmitting: true
                });

                for (let i = 0; i < eleArray.length; i++) {
                    let id = eleArray[i].trimStart(),
                        elId = document.getElementById(id);
                    console.log(id);

                    validator.addField(elId, [
                        {
                            rule: elId.getAttribute('data-rule'),
                            errorMessage: elId.getAttribute('data-err-msg')
                        }
                    ])
                }
            }
        },
        pristineValidate: {
            init: function (selector, btnSubmit=null) {
                let defaultConfig = {
                    classTo: 'form-group',
                    errorClass: 'error',
                    successClass: 'has-success',
                    errorTextParent: 'form-group',
                    errorTextTag: 'span',
                    errorTextClass: 'error'
                };

                if (document.readyState === 'complete') {
                    console.log(`btn-submit: ${btnSubmit}`);
                    theme.helpers.pristineCheck(selector, defaultConfig, btnSubmit);
                }
                window.onload = function () {
                    theme.helpers.pristineCheck(selector, defaultConfig, btnSubmit);
                }
            }
        },
        pristineCheck: function (selector, config, btnSubmit=null) {
            const form = document.getElementById(selector);
            let pristine = new Pristine(form, config);
            console.log(`submit: ${btnSubmit}`);
            form.addEventListener('submit', ev => {
                let valid = pristine.validate();
                console.log(valid);
                if (valid) {
                    console.log(btnSubmit);
                    if (!(btnSubmit === null)) {
                        const btn = document.getElementById(btnSubmit);
                        btn.classList.remove('disabled');
                    }
                    return true;
                } else {
                    ev.preventDefault();
                }
            })
        },
        pristineInit: function () {
            Pristine.addValidator('conditional', function (value, param1, param2) {
                let ele = document.getElementById(param1),
                    bsEle = document.getElementById(param2);
                return bsEle.classList.contains('active') && ele.value.length === 0 ? false : true;
            });
        },
        csrfSafeMethod: (method) => {
            return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        },
        windowScroll: () => {
            const navbar = document.getElementById('topnav');
            if (navbar != null) {
                if (
                    document.body.scrollTop >= 50 ||
                    document.documentElement.scrollTop >= 50
                ) {
                    navbar.classList.add("nav-sticky");
                } else {
                    navbar.classList.remove("nav-sticky");
                }
            }
        },
        bootstrapModalForms: (el) => {
            document.addEventListener('DOMContentLoaded', (e) => {
                modalForm(el, {
                    formURL: el.getAttribute('data-form-url'),
                })
            });
        },
        maximumInputLength: (el) => {
            const maxLength = el.getAttribute('maxlength');
            el.addEventListener('keyup', (ev) => {
                if (ev) {
                    ev.preventDefault();
                }
                if (el.hasAttribute('chars')) {
                    const spanLength = el.parentElement.lastElementChild.firstElementChild;
                    el.setAttribute('chars', el.value.length);
                    spanLength.textContent = `${el.getAttribute('chars')} / ${maxLength}`;
                }
            })
        },
        submitForm: (el) => {
            el.addEventListener('click', (e) => {
                if (e) {
                    e.preventDefault();
                }
                if (el.hasAttribute('data-form-target')) {
                    const frmTarget = el.getAttribute('data-form-target');
                    document.getElementById(frmTarget).submit();
                } else {
                    el.closest('form').submit();
                }
            })
        }
    },
    components: {}
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.jQuery) {
            globalThis.csrfToken = theme.helpers.getCookie('csrftoken');
            jQuery.ajaxSetup({
                beforeSend: (xhr, settings) => {
                    if (!theme.helpers.csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", window.csrfToken);
                    }
                }
            });
        }
        theme.init();
        theme.helpers.pristineInit();
        theme.helpers.activateMenu();
    });
    document.querySelectorAll('.bootstrap-modal').forEach(el => {
        theme.helpers.bootstrapModalForms(el);
    })
}

window.addEventListener('scroll', (ev) => {
    ev.preventDefault();
    theme.helpers.windowScroll();
});

(() => {
    var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (current === "") return;
    var menuItems = document.querySelectorAll('.sidebar-nav a');
    for (var i = 0, len = menuItems.length; i < len; i++) {
        if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
            menuItems[i].parentElement.className += " active";
        }
    }
})();