(function($) {
    // 渲染分页元素
    function renderpager(opts) {
        var $pagination = $('<ul id="pagination"></ul>');
        
        var currPage = parseInt(opts.currPage), pagecount = parseInt(opts.pagecount), display = parseInt(opts.display);
        // 添加 first previous 按钮
        $pagination.append(renderButton(opts.prev, opts));
        
        // 计算分段
        var startPoint = 1, endPoint = 1;
        
        var half = parseInt(display / 2);
        if (currPage - half > 0) {
        	startPoint = (currPage - half) + 1;
		} else {
			startPoint = 1;
		}
		if (startPoint + display > pagecount) {
			endPoint = pagecount + 1;
			startPoint = endPoint - display;
		} else {
			endPoint = startPoint + display;
		}
		if (startPoint < 1) {
			startPoint = 1;
		}
        // 渲染 v1, v2, v3 ... 按钮
        for (var page = 1; page <= pagecount; page++) {
			var currentButton = $('<li class="btn btn-white"><a href="javascript:void(0);">' + (page) + '</a></li>');
			if(pagecount <= 5){
				currentButton.appendTo($pagination);
			}else if(pagecount > 5){
				if(currPage <= 3 && page >= 1 && page < 5){
					currentButton.appendTo($pagination);
				}else if(currPage > 3 && currPage < pagecount - 2){
					if(page == 1){
						currentButton.appendTo($pagination);
						var dots = $('<li class="btn btn-white"><span>...</span></li>');
						dots.appendTo($pagination);
					}else if(page >= currPage - 1 && page <= currPage + 1){
						currentButton.appendTo($pagination);
					}else if(page == pagecount){
						var dots = $('<li class="btn btn-white"><span>...</span></li>');
						dots.appendTo($pagination);
						currentButton.appendTo($pagination);
					}
				}else if(currPage >= pagecount-2 && currPage <= pagecount){
					if(page == 1){
						currentButton.appendTo($pagination);
						var dots = $('<li class="btn btn-white"><span>...</span></li>');
						dots.appendTo($pagination);
					}else if(page >= pagecount - 3 && page <= pagecount){
						currentButton.appendTo($pagination);
					}
				}else if(page == pagecount){
					var dots = $('<li class="btn btn-white"><span>...</span></li>');
					dots.appendTo($pagination);
					currentButton.appendTo($pagination);
				}
			}
			page == currPage ? currentButton.addClass('active') : currentButton.click(function() { opts.callback($(this).children().first().text(), opts.keyword); });
        }
        // 添加 next last 按钮.
        $pagination.append(renderButton(opts.next, opts));
        
        return $pagination;
    }

    function renderButton(btn, opts) {
    	var currPage = parseInt(opts.currPage), pagecount = parseInt(opts.pagecount);
    	
        var $BtnPrev = $('<li class="btn btn-white"><a href="javascript:void(0);">' + btn + '</a></li>');
        var $BtnNext = $('<li class="btn btn-white"><a href="javascript:void(0);">' + btn + '</a></li>');
        var destPage = 1;

        // 页码设置
        switch (btn) {
            case opts.first:
                destPage = 1;
                break;
            case opts.prev:
                destPage = currPage - 1;
                break;
            case opts.next:
                destPage = currPage + 1;
                break;
            case opts.last:
                destPage = pagecount;
                break;
        }

        // 添加按钮事件,无效的按钮置灰.
        if (btn == opts.first || btn == opts.prev) {
        	currPage <= 1 ? $BtnPrev.addClass('false') : $BtnPrev.click(function() { opts.callback(destPage, opts.keyword); });
        }else {
        	currPage >= pagecount ? $BtnNext.addClass('false') : $BtnNext.click(function() { opts.callback(destPage, opts.keyword); });
        }
        if(btn == opts.prev){
        	return $BtnPrev;
        }else if(btn == opts.next){
        	return $BtnNext;
        }
		
    }
    
    $.fn.paging = function(options) {
        var opts = $.extend({}, $.fn.paging.defaults, options);
        return this.each(function() {
        	// 清空目标元素, 渲染分页元素
            $(this).empty().append(renderpager(opts));
            
            // 设置鼠标移动的光标
            $('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });
        });
    };
    
    // 参数配置
    $.fn.paging.defaults = {
        currPage: 1,
        pagecount: 1,
        display: 5,
		prev: " < ",
		next: " > ",
		callback: function(currenPage){}
    };

})(jQuery);