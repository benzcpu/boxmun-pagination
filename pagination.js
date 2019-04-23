


function paginationItem(object){
    var groupObject= $('.'+object.classGroupItem);
    var itemObject= $('.'+object.classGroupItem).find('.'+object.classItem);

    $(itemObject).addClass('pagination-ui-hidden');
    $.each(itemObject,function(idx,item){
        if(idx<object.showItemInpage){
            $(item).removeClass('pagination-ui-hidden');
        }
    });
    paginationTabIndex(object);
}
function paginationTabIndex(object){
    var groupObject= $('.'+object.classGroupItem);
    var itemObject= $('.'+object.classGroupItem).find('.'+object.classItem);
    var showItemInpage=object.showItemInpage;
    var alltabIndex=Math.ceil( parseInt(itemObject.length)/ parseInt(showItemInpage));

    if(alltabIndex!=1){


    var html='<div class="pagination-ui-tabIndex" data-alltabIndex="'+alltabIndex+'" data-group="'+object.classGroupItem+'" data-showItem="'+object.showItemInpage+'">';
    if(object.tabIndexMax){
        html= html+'<div class="buttom pagination-ui-click frist" data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="1"><<</div>';
        html= html+'<div class="buttom pagination-ui-click back" data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="1"><</div>';
    }else{
        html= html+'<div class="buttom pagination-ui-click frist" data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="1"><<</div>';
        html= html+'<div class="buttom pagination-ui-click back" data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="1"><</div>';
    }
    if(object.tabIndexMax){
        for(var i=1;i<=alltabIndex;i++){
            if(object.tabIndexMax<i){
                html= html+'<div class="buttom pagination-ui-click pagination-ui-number-click pagination-ui-hidden" data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="'+i+'">'+i+'</div>';
            }else{
                html= html+'<div class="buttom pagination-ui-click pagination-ui-number-click " data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="'+i+'">'+i+'</div>';
            }
        }
    }else{
        for(var i=1;i<=alltabIndex;i++){
            html= html+'<div class="buttom pagination-ui-click pagination-ui-number-click" data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="'+i+'">'+i+'</div>';
        }
    }
    if(object.tabIndexMax){
        html= html+'<div class="buttom pagination-ui-click next" data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="2">></div>';
        html= html+'<div class="buttom pagination-ui-click last" data-tabIndexMax="'+object.tabIndexMax+'"  data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="'+alltabIndex+'">>></div>';
    }else{
        html= html+'<div class="buttom pagination-ui-click next" data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="2">></div>';
        html= html+'<div class="buttom pagination-ui-click last" data-group="'+object.classGroupItem+'" data-item="'+object.classItem+'" data-index="'+alltabIndex+'">>></div>';
    }

    html= html+'</div>';
    }
    $(".pagination-ui-tabIndex[data-group='"+object.classGroupItem+"']").remove();
    $(groupObject).append(html);
}
$(document).on('click','.pagination-ui-click',function(){

    var self=$(this);
    var groupObject= $('.'+self.attr('data-group'));
    var itemObject= $('.'+self.attr('data-group')).find('.'+self.attr('data-item')) ;
    var indexNow=parseInt(self.attr('data-index'));
    var tabIndexMax= self.attr('data-tabindexmax');
    var itemTabIndex=$(".pagination-ui-number-click[data-group='"+self.attr('data-group')+"']");
    var showItemInpage=parseInt($(".pagination-ui-tabIndex[data-group='"+self.attr('data-group')+"'").attr('data-showItem'));
    var alltabIndex=parseInt($(".pagination-ui-tabIndex[data-group='"+self.attr('data-group')+"'").attr('data-alltabIndex'));
    itemTabIndex.removeClass('current');
    $(".pagination-ui-number-click[data-group='"+self.attr('data-group')+"'][data-index='"+indexNow+"']").addClass('current');
    itemObject.addClass('pagination-ui-hidden');

    $.each(itemObject,function(idx,item){
        if(((indexNow*showItemInpage)-(showItemInpage-1))<=idx+1 && ((indexNow*showItemInpage))>=idx+1){
            $(item).removeClass('pagination-ui-hidden');
        }
    });

    if(indexNow==1){
        $(".pagination-ui-click.back[data-group='"+self.attr('data-group')+"']").attr({'data-index':indexNow});
    }else{
        $(".pagination-ui-click.back[data-group='"+self.attr('data-group')+"']").attr({'data-index':indexNow-1});
    }

    if(indexNow==alltabIndex){
        $(".pagination-ui-click.next[data-group='"+self.attr('data-group')+"']").attr({'data-index':indexNow});
    }else{
        $(".pagination-ui-click.next[data-group='"+self.attr('data-group')+"']").attr({'data-index':indexNow+1});
    }

    if(tabIndexMax!=undefined){
        var startpage = indexNow;
        var endpage = alltabIndex;
        if (indexNow <= Math.ceil(tabIndexMax/2)) {
            startpage = 1;
            endpage = tabIndexMax;
        } else {
            if(tabIndexMax%2==0){
                endpage = indexNow + Math.ceil(tabIndexMax/2);
                startpage = endpage-tabIndexMax+1;
            }else{
                endpage = indexNow + Math.ceil(tabIndexMax/2)-1;

                startpage = endpage-tabIndexMax+1;
            }

        }

        // var totalItems2 = Math.ceil(totalItems / itemPerpage);
        //
        // if (totalItems2-index < 10) {
        //     startpage = totalItems2-20;
        //
        //
        // }

        if(alltabIndex-indexNow< Math.ceil(tabIndexMax/2)){
            if(tabIndexMax%2==0){
                startpage=alltabIndex-tabIndexMax+1;
            }else{
                startpage=alltabIndex-tabIndexMax+1;
            }

        }

        $(".pagination-ui-number-click[data-group='"+self.attr('data-group')+"']").addClass('pagination-ui-hidden');
        $.each($(".pagination-ui-number-click[data-group='"+self.attr('data-group')+"']"),function(idx,item){
            if (parseInt(startpage) <= parseInt($(item).attr('data-index')) && parseInt(endpage) >= parseInt($(item).attr('data-index'))) {
                $(item).removeClass('pagination-ui-hidden');
            }
        });

    }


})
