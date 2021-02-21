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
        // console.log( doc);

        if( doc ){
            var itemExists = false;
            doc.galleryItem.forEach( e => {

                if( e.imageFolder == isSingleItem ){
                    itemExists = true;
                    // console.log( e );
                    $(".cs-top-age").html( e.age );
                    $(".cs-top-height").html( typeof e.binfo[ 2 ] !== 'undefined' ? e.binfo[ 2 ] : 'n/a' );
                    $(".cs-top-weight").html( typeof e.binfo[ 3 ] !=='undefined' ? e.binfo[ 3 ] : 'n/a' );
                    $(".cs-top-it").html( typeof e.ainfo[ 3 ] !=='undefined' ? e.ainfo[ 3 ] : 'n/a' );
                    $(".cs-top-ip").html( typeof e.binfo[ 1 ] !=='undefined' ? e.binfo[ 1 ] : 'n/a' );
                    $(".cs-top-vol").html( typeof e.ainfo[ 0 ] !=='undefined' ? e.ainfo[ 0 ] : 'n/a' );

                    $(".cs-top-procedure").html( typeof e.altText !=='undefined' ? e.altText : '--' );

                    $(".cs-top-details").html( typeof e.details !=='undefined' ? e.details : '--');

                    // var procedures = '';
                    // e.procedure.forEach( p => {
                    //     procedures += "<li>"+ p +"</li>";
                    //     // console.log( p + 'test' );
                    // });

                    // $(".cs-procedures").html( '<ul>'+ procedures +'</ul>' );

                    $(".cs-doc-name").html( typeof e.docProfile.name !== 'undefined' ? e.docProfile.name : '--' );
                    $(".cs-doc-text").html( typeof e.docProfile.text !== 'undefined' ? e.docProfile.text : '--' );

                    // console.log( typeof e.review );

                    var review = typeof e.review !== 'undefined' ? e.review[ 2 ] : '--';
                    review += typeof e.review !== 'undefined' ? ' <br> -- ' + e.review[ 0 ] : '--';

                    $(".cs-doc-review").html( review );



                    // var docLinks = '';
                    // e.docProfile.links.forEach( p => {
                    //     docLinks += "<li>"+ p +"</li>";
                    // });
                    // $(".cs-doc-links").html( docLinks );

                    // console.log( isSingleItem );
                    console.log( csGalImages[ isSingleItem ] );
                    
                    if( typeof csGalImages[ isSingleItem ]  !== 'undefined' ){

                        var frontGalleryImages = '<div class="row gallery-front mb-20"><div class="col-lg-12"><h5>Front</h5></div>';
                        console.log( jQuery.isEmptyObject( csGalImages[ isSingleItem ][ 'front' ] ));
                        if( false === jQuery.isEmptyObject( csGalImages[ isSingleItem ][ 'front' ]  ) ) {
                            csGalImages[ isSingleItem ][ 'front' ].forEach( img => {
                                frontGalleryImages += '<div class="col-lg-6 mb-30"> <img class="img-fluid more-img" data-src="'+img+'" alt="'+e.altText+'"> </div>';
                                // frontGalleryImages += '<div class="col-lg-6"> '+img+' </div>';
                            });
                        }else{
                            frontGalleryImages += '<div class="col-lg-12"> <div class="alert alert-warning"> <i class="fa fa-warning"></i> No image found!</div> </div>';
                        }
                        frontGalleryImages += '</div>';

                        frontGalleryImages += '<div class="row gallery-oblique mb-20"><div class="col-lg-12"><h5>Oblique</h5></div>';
                        if( false === jQuery.isEmptyObject( csGalImages[ isSingleItem ][ 'oblique' ]  ) ) {
                            csGalImages[ isSingleItem ][ 'oblique' ].forEach( img => {
                                frontGalleryImages += '<div class="col-lg-6 mb-30"> <img class="img-fluid more-img" data-src="'+img+'" alt="'+e.altText+'"> </div>';
                                // frontGalleryImages += '<div class="col-lg-6"> '+img+' </div>';
                            });
                        }
                        else{
                            frontGalleryImages += '<div class="col-lg-12"> <div class="alert alert-warning"> <i class="fa fa-warning"></i> No image found!</div> </div>';
                        }
                        frontGalleryImages += '</div>';

                        frontGalleryImages += '<div class="row gallery-side mb-20"><div class="col-lg-12"><h5>Side</h5></div>';
                        if( false === jQuery.isEmptyObject( csGalImages[ isSingleItem ][ 'side' ]  ) ) {
                            csGalImages[ isSingleItem ][ 'side' ].forEach( img => {
                                frontGalleryImages += '<div class="col-lg-6 mb-30"> <img class="img-fluid more-img" data-src="'+img+'" alt="'+e.altText+'"> </div>';
                                // frontGalleryImages += '<div class="col-lg-6"> '+img+' </div>';
                            });
                        }
                        else{
                            frontGalleryImages += '<div class="col-lg-12"> <div class="alert alert-warning"> <i class="fa fa-warning"></i> No image found!</div> </div>';
                        }
                        frontGalleryImages += '</div>';


                        $(".single-item-gallery").html( '<div class="col-lg-12"> ' + frontGalleryImages + '</div>');

                    }


                    // console.log( e.categories );

                    //get category name
                    var catName = ''; var c = 0;
                    doc.filterList.forEach( cn => { 
                        if( BGal.searchStr( cn.category, e.categories) ){
                            // console.log( cn.name );
                            if( c > 0 ) {
                                catName += ' & ' + cn.name;
                            }else{
                                catName = cn.name;
                            }

                            c++;
                        }
                    });

                    var pID = typeof e.binfo !== 'undefined' ? e.binfo[ 0 ] : '--';
                    $(".cs_more_pic_title").html( catName + ' ' + pID  );

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