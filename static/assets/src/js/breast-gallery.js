const YAML = require('yamljs');

var BGal = { 
    getParameterByName : function( name, url = window.location.href ){
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    searchStr : function( search, mainStr){
        var regex = '\\b';
        regex += search.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        regex += '\\b';

        return new RegExp(regex, "i").test(mainStr);
    }
};

$(document).ready(function(){

    console.log( BGal.getParameterByName('listing') );
    var isSingleItem = BGal.getParameterByName('listing');
    if( typeof isSingleItem !== 'undefined' && isSingleItem != null  ){
        $(".list-page").hide();
        $(".single-item-page").show();
    }else{
        $(".list-page").show();
        $(".single-item-page").hide();
    }

    try {
        const doc = YAML.load('/data/breastGallery.yml');
        console.log( doc);
        if( doc ){
            var itemExists = false;
            doc.galleryItem.forEach( e => {

                if( e.imageFolder == isSingleItem ){
                    itemExists = true;
                    console.log( e );
                    $(".cs-top-age").html( e.age );
                    $(".cs-top-gender").html( e.gender ? e.gender : 'Female' );
                    $(".cs-top-details").html( e.details );

                    var procedures = '';
                    e.procedure.forEach( p => {
                        procedures += "<li>"+ p +"</li>";
                        // console.log( p + 'test' );
                    });

                    $(".cs-procedures").html( '<ul>'+ procedures +'</ul>' );

                    $(".cs-doc-name").html( e.docProfile.name );
                    $(".cs-doc-text").html( e.docProfile.text );

                    var docLinks = '';
                    e.docProfile.links.forEach( p => {
                        docLinks += "<li>"+ p +"</li>";
                    });
                    $(".cs-doc-links").html( docLinks );

                    // console.log( isSingleItem );
                    // console.log( csGalImages );
                    
                    if( typeof csGalImages[ isSingleItem ] !== 'undefined' ){
                        var galleryImages = '';

                        csGalImages[ isSingleItem ].forEach( img => {
                            galleryImages += '<div class="col-lg-4 mb-30"> <img class="img-fluid more-img" data-src="'+img+'" alt="'+e.altText+'"> </div>';
                            // galleryImages += '<div class="col-lg-4"> '+img+' </div>';
                        });

                        $(".single-item-gallery").html( '<div class="row">' + galleryImages + '</div>' );

                    }


                    // console.log( e.categories );

                    //get category name
                    var catName = ''; var c = 0;
                    doc.filterList.forEach( cn => { 
                        if( BGal.searchStr( cn.category, e.categories) ){
                            console.log( cn.name );
                            if( c > 0 ) {
                                catName += ' & ' + cn.name;
                            }else{
                                catName = cn.name;
                            }

                            c++;
                        }
                    });

                    $(".cs_more_pic_title").html( catName + ' Gallery' );

                    var keys = Object.keys(csGalImages);
                    var lastKey = keys[keys.length - 1];
                    var firstKey = keys[0];
                    var curIndex = keys.indexOf( isSingleItem );

                    // console.log(firstKey);
                    // console.log( keys.indexOf( isSingleItem ) );
                    
                    if( isSingleItem != firstKey ){
                        var preIndex = curIndex != 0 ? parseInt( curIndex ) - 1 : 0;
                        var prevKey = keys[ preIndex ];
                        $(".link-prev").attr('href', "/breast-gallery/beforeandafter/?listing=" + prevKey ).removeClass('btn-disabled');
                    }

                    if( isSingleItem != lastKey ){
                        var nextIndex = parseInt( curIndex ) + 1;
                        var nextKey = keys[ nextIndex ];
                        $(".link-next").attr('href', "/breast-gallery/beforeandafter/?listing=" + nextKey ).removeClass('btn-disabled');
                    }

                }
            });


            if( false === itemExists ){
                $(".single-item-page .item-main").hide();
                $(".item-not-found").show();
            }

            
            
            

            
        }

      } catch (e) {
        console.log(e);
      }

});