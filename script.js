$(document).ready(function() {
    let autoRedirectTimer; // 用于自动跳转的计时器

    // 初始化装饰元素
    $('.decoration').each(function(i) {
        $(this).delay(i *200).animate({opacity: 0.5}, 1000);*
    });

    // 控制页面滚动的函数
    function preventScroll() {
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });
    }

    function allowScroll() {
        $('html, body').css({
            overflow: '',
            height: ''
        });
    }

    // ==========================================
    // 文字效果和动画函数
    // ==========================================

    // 打字效果函数
    function typeText(element, callback) {
        const text = element.text();
        const typingSpeed = 100; // 打字速度

        element.text('').css('opacity', 1);

        let i = 0;
        const interval = setInterval(function() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
                if (callback) setTimeout(callback, 1000);
            }
        }, typingSpeed);
    }

    // 烟雾消散效果
    function smokeEffect(element, callback) {
        const text = element.text();
        const position = element.position();
        const elementWidth = element.width();
        const elementHeight = element.height();

        // 为每个字符创建粒子
        for (let i = 0; i < text.length; i++) {
            const charWidth = elementWidth / text.length;
            const baseX = position.left + i* charWidth;*
            const baseY = position.top;

            // 为每个字符创建多个粒子
            for (let j = 0; j < 20; j++) {
                createParticle(baseX, baseY, elementHeight);
            }
        }

        // 文字消失
        element.fadeOut(800, function() {
            if (callback) setTimeout(callback, 500);
        });
    }

    // 创建单个粒子
    function createParticle(x, y, height) {
        const colors = ['#45413C', '#888', '#666', '#999'];
        const color = colors[Math.floor(Math.random() *colors.length)];*

        const particle = $('<div class="particle"></div>');
        $('body').append(particle);

        // 随机定位在字符周围
        const offsetX = Math.random()* 20 - 10;*
        const offsetY = Math.random() *height - height/2;*

        const size = 2 + Math.random()* 4;*

        particle.css({
            left: (x + offsetX) + 'px',
            top: (y + offsetY) + 'px',
            width: size + 'px',
            height: size + 'px',
            backgroundColor: color,
            opacity: 0.7 + Math.random() *0.3*
        });

        // 动画：烟雾飘散
        const angle = Math.random()* Math.PI *2;
        const speed = 1 + Math.random()* 3;*
        const deltaX = speed *Math.cos(angle);*
        const deltaY = speed* Math.sin(angle);*
        const rotation = Math.random() *360;*
        const duration = 1000 + Math.random()* 2000;*

        particle.animate({
            left: x + deltaX *100 + 'px',*
            top: y + deltaY* 100 + 'px',*
            opacity: 0,
            transform: 'rotate(' + rotation + 'deg)'
        }, duration, function() {
            $(this).remove(); // 动画结束后清理元素
        });
    }

    // 创建emoji雨效果
    function createEmojiRain() {
        const emojis = ['🤡', '🤣', '😂'];
        const emojiRain = $('#emojiRain');
        emojiRain.empty(); // 清空已有的emoji

        for (let i = 0; i < 50; i++) {
            const emoji = emojis[Math.floor(Math.random() *emojis.length)];*
            const emojiEl = $('<div class="falling-emoji">' + emoji + '</div>');

            // 随机位置和动画时间
            const left = Math.random()* 100;*
            const delay = Math.random() *3;*
            const duration = 3 + Math.random()* 4;*

            emojiEl.css({
                left: left + '%',
                animationDuration: duration + 's',
                animationDelay: delay + 's'
            });

            emojiRain.append(emojiEl);
        }
    }

    // 创建礼花效果
    function createFireworks() {
        const fireworks = $('.fireworks');
        fireworks.empty(); // 清空已有的礼花

        const colors = ['#FF4081', '#FFB865', '#91B2FA', '#8BC34A', '#9C27B0'];

        for (let i = 0; i < 5; i++) {
            setTimeout(function() {
                const x = 10 + Math.random() *80;*
                const y = 10 + Math.random()* 60;*
                createFirework(x, y, colors[Math.floor(Math.random() *colors.length)]);*
            }, i* 300);*
        }

        function createFirework(x, y, color) {
            for (let i = 0; i < 30; i++) {
                const particle = $('<div class="firework"></div>');
                fireworks.append(particle);

                const angle = Math.random() *Math.PI* 2;
                const speed = 2 + Math.random() *3;*
                const size = 2 + Math.random()* 4;*

                particle.css({
                    left: x + '%',
                    top: y + '%',
                    backgroundColor: color,
                    width: size + 'px',
                    height: size + 'px'
                });

                const destinationX = x + Math.cos(angle) *speed* 15;
                const destinationY = y + Math.sin(angle) *speed* 15;

                particle.animate({
                    left: destinationX + '%',
                    top: destinationY + '%',
                    opacity: 0
                }, 1000 + Math.random() *1000, function() {*
                    $(this).remove(); // 清理元素
                });
            }
        }
    }

    // 创建气球效果
    function createBalloons() {
        const balloons = $('.balloons');
        balloons.empty(); // 清空已有的气球

        const balloonEmojis = ['🎈', '🎊', '🎉', '✨', '🎁'];

        for (let i = 0; i < 15; i++) {
            const balloon = $('<div class="balloon">' + balloonEmojis[Math.floor(Math.random()* balloonEmojis.length)] + '</div>');*
            balloons.append(balloon);

            const left = Math.random() *100;*
            const delay = Math.random()* 3;*

            balloon.css({
                left: left + '%',
                bottom: '-50px',
                animationDelay: delay + 's'
            });
        }
    }

    // ==========================================
    // 场景切换函数
    // ==========================================

    // 初始化动画序列
    function startInitialAnimation() {
        preventScroll(); // 动画期间禁止滚动

        setTimeout(function() {
            typeText($('#typingText1'), function() {
                smokeEffect($('#typingText1'), function() {
                    typeText($('#typingText2'), function() {
                        smokeEffect($('#typingText2'), function() {
                            typeText($('#typingText3'), function() {
                                smokeEffect($('#typingText3'), function() {
                                    typeText($('#typingText4'), function() {
                                        smokeEffect($('#typingText4'), function() {
                                            // 显示最终问题和选项
                                            $('#question').animate({opacity: 1}, 800);
                                            setTimeout(function() {
                                                $('#options').animate({opacity: 1}, 800);
                                                allowScroll(); // 动画完成后恢复滚动
                                            }, 600);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }, 1000);
    }

    // 显示"聪明如我"场景
    function showKnowScene() {
        preventScroll();
        $('#initialScene').fadeOut(500, function() {
            $('#knowScene').removeClass('hide').hide().fadeIn(500, allowScroll);
        });
    }

    // 显示"啊吧啊吧"场景
    function showDunnoScene() {
        preventScroll();
        $('#initialScene').fadeOut(500, function() {
            $('#dunnoScene').removeClass('hide').hide().fadeIn(500);
            createEmojiRain();

            // 延迟显示消息框
            setTimeout(function() {
                $('.message-box').css('opacity', '1');
                allowScroll();

                // 3秒后自动跳转到成绩查询页面
                autoRedirectTimer = setTimeout(function() {
                    showCetQueryScene();
                }, 3000);
            }, 1500);
        });
    }

    // 显示"聪明结果"场景
    function showSmartResultScene() {
        preventScroll();
        $('#knowScene').fadeOut(500, function() {
            $('#smartResultScene').removeClass('hide').hide().fadeIn(500);
            createFireworks();
            createBalloons();
            allowScroll();

            // 3秒后自动跳转到成绩查询页面
            autoRedirectTimer = setTimeout(function() {
                showCetQueryScene();
            }, 3000);
        });
    }

    // 显示成绩查询页面
    function showCetQueryScene() {
        preventScroll();
        $('.scene:not(#cetQueryScene)').fadeOut(500, function() {
            $('#cetQueryScene').removeClass('hide').hide().fadeIn(500, allowScroll);
            // 确保结果容器是隐藏的，查询容器是显示的
            $('#results-container').addClass('hide');
            $('#query-container').removeClass('hide');
        });
    }

    // 显示彩蛋页面
    function showEasterEggScene() {
        preventScroll();
        $('#cetQueryScene').fadeOut(500, function() {
            $('#easterEggScene').removeClass('hide').hide().fadeIn(500, allowScroll);
        });
    }

    // 重置到初始状态
    function resetToInitial() {
        // 清除所有可能正在运行的计时器
        clearTimeout(autoRedirectTimer);

        // 隐藏所有场景，只显示初始场景
        $('.scene').addClass('hide');
        $('#initialScene').removeClass('hide');

        // 重置初始场景状态
        $('#typingText1, #typingText2, #typingText3, #typingText4').css('opacity', 0).show();
        $('#question').css('opacity', 0);
        $('#options').css('opacity', 0);

        // 清理所有动态创建的元素
        $('.particle, .falling-emoji, .firework, .balloon').remove();

        // 重新开始初始动画
        startInitialAnimation();
    }

    // ==========================================
    // 事件处理
    // ==========================================

    // 初始选择按钮
    $('#knowBtn').click(function() {
        showKnowScene();
    });

    $('#dunnoBtn').click(function() {
        showDunnoScene();
    });

    // 聪明如我场景的按钮
    $('#submitInput').click(function() {
        showSmartResultScene();
    });

    $('#emperorOption').click(function() {
        showSmartResultScene();
    });

    // 为输入框添加回车事件
    $('#userInput').keypress(function(e) {
        if (e.which === 13) {
            showSmartResultScene();
        }
    });

    // CET查询页面按钮
    $('#cetQueryBtn').click(function() {
        $('#query-container').addClass('hide');
        $('#results-container').removeClass('hide');
    });

    $('#backToCetQueryBtn').click(function() {
        $('#results-container').addClass('hide');
        $('#query-container').removeClass('hide');
    });

    // 皇帝抱怨按钮
    $('#emperorComplaintBtn').click(function() {
        showEasterEggScene();
    });

    // 重新开始按钮
    $('#restartBtn').click(function() {
        resetToInitial();
    });

    // 启动初始动画
    startInitialAnimation();
});
