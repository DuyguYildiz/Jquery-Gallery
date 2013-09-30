// JavaScript Document

$(document).ready(function(){
	
    var gallery = new Gallery($('.gallery'));

    function Gallery(content) {
        this.sliderItem = content.find('.gallery-thumb-holder ul li');
		this.galleryHolder = content.find('.gallery-holder ul');
        this.galleryItem = content.find('.gallery-holder ul li');
        this.activeItem = $(this.galleryItem[0]);
        this.activeItem.fadeIn();

        this.cLeftBtn = content.find('.ct-left');
        this.cRightBtn = content.find('.ct-right');		
		this.sLeftBtn = content.find('.th-left');
        this.sRightBtn = content.find('.th-right');
        this.index = 0;
		this.sliderIndex = 0;
		
		var galleryHolder = this.galleryHolder;
        var sliderItem = this.sliderItem;
        var galleryItem = this.galleryItem;
        var activeItem = this.activeItem;

        var cLeftBtn = this.cLeftBtn;
        var cRightBtn = this.cRightBtn;
		var sLeftBtn = this.sLeftBtn;
        var sRightBtn = this.sRightBtn;
		
        var index = this.index;
		var sliderIndex = this.sliderIndex;

		var anim = "fade";
		cLeftBtn.css('top', ($('.gallery-content').height() - cLeftBtn.height()) / 2);
		cRightBtn.css('top', ($('.gallery-content').height() - cRightBtn.height()) / 2);
		sLeftBtn.css('top', ($('.gallery-thumb-content').height() - sLeftBtn.height()) / 2);
		sRightBtn.css('top', ($('.gallery-thumb-content').height() - sRightBtn.height()) / 2);
		
        sliderItem.unbind('mouseenter').bind('mouseenter', function () {
            sliderItem.removeClass('hover');
            $(this).addClass('hover');
        });

        sliderItem.unbind('mouseleave').bind('mouseleave', function () {
            $(this).removeClass('hover');
        });
        sliderItem.unbind('click').bind('click', function () {
            index = $(this).index();

            changeSlider(index);
            changeGallery(index);
        });

        this.changeGallery = function changeGallery(_index) {
			if(anim == "fade"){
				if (activeItem)
           			activeItem.fadeOut();       

            	activeItem = $(galleryItem[_index]);
            	activeItem.fadeIn(250);
			}
			else if(anim == "slide"){
				galleryHolder.animate({'margin-left':-$('.gallery-content').width() * _index}, 500 );
				activeItem = $(galleryItem[_index]);
            	//activeItem.fadeIn(250);
			};
        }

        this.changeSlider = function changeSlider(_index) {
            sliderItem.removeClass('active');
            $(sliderItem[_index]).addClass('active');
        }

        this.slideSlider = function slideSlider(_index) {
            //var a = Math.ceil(_index / 5);
			var sWidth = $('.gallery-thumb-content').width();
		    var content = $('.gallery-thumb-holder ul');
        	content.animate({'left': -sWidth * _index}, 500);
		}
		
        cLeftBtn.unbind('click').bind('click', function () {
            if (index == 0) index = 7; /*return false;*/
            index--;
            changeGallery(index);
            changeSlider(index);
        });
        cRightBtn.unbind('click').bind('click', function () {
            if (index == sliderItem.length - 1) index = -1; /*return false;*/
            index++;
            changeGallery(index);
            changeSlider(index);
        });

        sLeftBtn.unbind('click').bind('click', function () {
            if (sliderIndex == 0) return false;
            sliderIndex--;
            //changeGallery(index);
			slideSlider(sliderIndex);
            //changeSlider(index);
        });
        sRightBtn.unbind('click').bind('click', function () {
            if (sliderIndex == Math.ceil((sliderItem.length / 5) - 1)) 
				/*sliderIndex = -1;*/ return false;
            
			sliderIndex++;
            //changeGallery(index);
			slideSlider(sliderIndex);
            //changeSlider(index);
        });
		
        var changeGallery = this.changeGallery;
        var changeSlider = this.changeSlider;
        var slideSlider = this.slideSlider;
    }	
});