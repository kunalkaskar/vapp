(function(){
    angular.module('starter')
    .controller('CallController', ['localStorageService', '$scope', '$ionicPopup', CallController]);

    function CallController(localStorageService, $scope, $ionicPopup){
            var customConfig, peer;
            $scope.username = localStorageService.get('username');

            $.get("https://service.xirsys.com/ice",
                    {
                        ident: "kunalkaskar",
                        secret: "a65087e4-148b-11e7-ac94-55546641270a",
                        domain: "www.buddybuzz.in",
                        application: "default",
                        room: "default",
                        secure: 0
                    },
                    function(data, status) {
                        console.log(JSON.stringify(data.d));
                        customConfig = data.d;
                        peer = new Peer($scope.username, {
                          key: '8cozvvip27tzw7b9',
                          config: customConfig
                        });


                        peer.on('call', onReceiveCall);
                        peer.on('close', function() {
                            console.log('peer close');
                        });
                        peer.on('error', function(error) {
                            document.getElementById('errors').innerHTML = error;
                        });
                });

            


            /* if you run your own peerserver
            var peer = new Peer($scope.username, {
              host: 'your-peerjs-server.com', port: 3000, path: '/peerjs',
              config: {'iceServers': [
                { url: 'stun:stun1.l.google.com:19302' },
                { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
              ]}
            });
          */

            function getVideo(successCallback, errorCallback){
                navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || getUserMedia;
                if (!navigator.getUserMedia_) {
                    CommonService.showErrorMessage('Your device doesn\'t suport Video Call');
                    CommonService.logErrors('Your device doesn\'t suport Video Call');
                    return;
                }
                navigator.getUserMedia_({video: true, audio: true}, successCallback, errorCallback); 
                //navigator.webkitGetUserMedia({audio: true, video: true}, successCallback, errorCallback);
            }


            function onReceiveCall(call){
                

                $ionicPopup.alert({
                    title: 'Incoming Call',
                    template: 'Someone is calling you. Connecting now..'
                });

                getVideo(
                    function(MediaStream){
                        //call.close();
                        call.answer(MediaStream);
                    },
                    function(err){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'An error occurred while try to connect to the device mic and camera'
                        });
                    }
                );
                call.on('close', function() {
                    console.log('closed');
                });
                call.on('stream', onReceiveStream);
            }


            function onReceiveStream(stream){
                console.log('stream'+stream);
                var video = document.getElementById('contact-video');
                video.src = window.URL.createObjectURL(stream);
                video.onloadedmetadata = function(){
                    $ionicPopup.alert({
                        title: 'Call Ongoing',
                        template: 'Call has started. You can speak now'
                    });
                };

            }

            $scope.startCall = function(){
                var contact_username = $scope.contact_username;

                getVideo(
                    function(MediaStream){
                        console.log(MediaStream);
                        var call = peer.call(contact_username, MediaStream);
                        call.on('close', function() {
                            console.log('call rejected');
                        })
                        call.on('error', function(error) {
                            console.log(error);
                        });
                        call.on('stream', onReceiveStream);
                    },
                    function(err){
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'An error occurred while try to connect to the device mic and camera'
                        });
                    }
                );

            };

            



    }

})();