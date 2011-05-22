/*
 * inputFile v0.1
 * Requires jQuery v1.32+
 * Created by Scott Greenfield
 *
 * Copyright 2011, Scott Greenfield
 * https://github.com/sgreenfield/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
(function($) {
    $.fn.inputFile = function(opt) {
        var settings = { btnClass: 'btn-gray', btnText: 'Browse...' },
            browser = $.browser,
            iecatch = browser.msie + browser.version;

        $.extend(settings, opt);
        
        return this.each(function(i) {
            var $inputFile = $(this),
                wrapper = $('<div class="' + settings.btnClass + '">' + settings.btnText + '</div>').addClass('jquery-input-file-wrapper'),
                id = 'file_' + i,
                $fakeInputFile = $('<input class="jquery-input-file-fake-file" id="' + id + '">'),
                inputFileWidth, inputFileHeight;
                
            if (iecatch.indexOf("true6") !== -1) return; //if using ie6, who cares... please die in a fire

            $fakeInputFile.insertBefore($inputFile)
                .focus(function(){
                    if (iecatch.indexOf("true") === 0) $fakeInputFile.blur(); //fixes ie bug (all versions... go figure)
                    $inputFile.click();
                }).keydown(function(e){
                    var code = e.keyCode || e.which;
                    if (code!==9 && code !==13) return false; //allow tab and enter key, but nothing else
                });

            $inputFile.add($fakeInputFile).wrapAll('<div class="jquery-input-file-outer-wrapper" />');

            $inputFile.wrap(wrapper)
                .addClass('jquery-input-file')
                .fadeTo(0,0)
                .change(function(){
                    $fakeInputFile.val($inputFile.val());
                });
            
            $inputFile.parent('.jquery-input-file-wrapper').after('<div style="clear:both;"></div>');
 
            inputFileWidth = $inputFile.parent('.jquery-input-file-wrapper').outerWidth() + $fakeInputFile.outerWidth();
            inputFileHeight = $fakeInputFile.outerHeight();

            $inputFile.css('height', inputFileHeight);
            
            if (browser.mozilla){ //mozilla doesn't like a CSS width for input type="file", so do this
                $inputFile.css({
                    width: 'auto',
                    fontSize: inputFileHeight
                }).attr('size', Math.ceil(inputFileWidth/inputFileHeight/0.613)); //set width via size attr
            }else{ //for everyone else, set the width in pixels
                $inputFile.css('width', inputFileWidth+10);
            }
        });
    };
})(jQuery);