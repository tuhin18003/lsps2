<?php 


function getDirContents($dir, &$results = array()) {
    $files = scandir($dir);

    foreach ($files as $key => $value) {
        
        $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
        if (!is_dir($path) ) {

            if ( false !== stripos( $path, 'ba.webp') || false !== stripos( $path, 'ba.jpg') ) {
                $results[] = $path;

                //final result

                // print_r(
                //     explode( '\\', $path )
                // );

                $filePath = explode( '\\', $path );

                copy(
                    $path,
                    '../images/breastgallery/' . $filePath[ 12 ]  . '/' . $filePath[ 13 ]
                );

                // echo $path;
            }
            
        } else if ($value != "." && $value != "..") {
            getDirContents($path, $results);
            
            if( $value !== 'more_pic' ){
                // echo $value;
                
                // mkdir("../images/breastgallery/" . $value, 0700);
                // mkdir("../images/breastgallery/" . $value .'/Front', 0700);
                // mkdir("../images/breastgallery/" . $value .'/Oblique', 0700);
                // mkdir("../images/breastgallery/" . $value . '/Side', 0700);

            }

            if ( false !== stripos( $path, 'ba.webp') || false !== stripos( $path, 'ba.jpg') ) {
                $results[] = $path;

                // echo $path;

            }
        }

    }

    return $results;
}

echo "<pre>";
print_r(
    getDirContents('../images/breastgallery-old/')
);

?>