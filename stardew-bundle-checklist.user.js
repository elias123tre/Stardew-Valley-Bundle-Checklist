// ==UserScript==
// @name         Stardew Valley community center wiki checklist
// @version      0.2
// @description  Script to add a checklist to Stardew Valley wiki for community center bundles. Checkbox states are saved after reload.
// @author       You
// @match        https://stardewvalleywiki.com/Bundles*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    $("head").prepend("<style>label{width:36px;height:36px;display:block}input:checked~label>svg{opacity:1}svg{opacity:0;transition:opacity 0.2s ease-in-out}</style>");
    $(".center").append('<input type="checkbox" class="checkbox">');
    $(".checkbox").css({"width": "36px", "height": "36px"});
    $(".floatnone").parent().css({"background-image": "url(/mediawiki/images/5/5e/Bundle_Slot.png)", "background-repeat": "no-repeat", "background-position": "center"});
    $(".floatnone > img").remove();
    $(".image").parent().next(".checkbox").remove();
    $(".checkbox").parent().css({"height": "36px"});

    $(".checkbox").attr('id', function (index) {
        return 'checkbox' + index;
    });

    $(".checkbox").each(function(index) {
        var id = $(this).attr("id")
        $(this).after('<label for="' + id + '"><svg style="width:30px;height:30px;margin: 0 auto" viewBox="0 0 24 24"><path fill="#6F6F6F" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg></label>')
    });

    $(".checkbox").hide()


    var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {}
    var $checkboxes = $("#mw-content-text :checkbox");

    $checkboxes.on("change", function(){
        $checkboxes.each(function(){
            checkboxValues[this.id] = this.checked;
        });

        localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
    });

    // On page load
    $.each(checkboxValues, function(key, value) {
        $("#" + key).prop('checked', value);
    });

})();
