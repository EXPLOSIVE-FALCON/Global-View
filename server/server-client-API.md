# Cient/Server API

## Instagram

# Make initial request from client to obtain a set of location ids corresponding to latitude/longitude coordinates

```
  request = {
    longitude: number,
    latitude: number,
    distance: number   
  }

var requestURL = 'https://api.instagram.com/v1/locations/search?lat=' + request.latitude + '&lng=' + request.latitude + '&distance=' + request.distance;

```
  
  
#Server response looks like: 

```
        {
          "meta":  {
            "code": 200
          },
          "data":  [
             {
              "latitude": 34.000481139,
              "id": "19440498",
              "longitude": -118.000284424,
              "name": "Hells Gate"
            },
             {
              "latitude": 33.999890776,
              "id": "3345400",
              "longitude": -118.001042138,
              "name": "Country Get Away"
            },
             {
              "latitude": 34.00019016,
              "id": "421958446",
              "longitude": -118.002432604,
              "name": "Gates Of Hell"
            },
             {
              "latitude": 34.001762,
              "id": "3280629",
              "longitude": -117.995964,
              "name": "eBay Orders..."
            },
             {
              "latitude": 33.995342855,
              "id": "259407329",
              "longitude": -118.001234752,
              "name": "Turnbull Canyon Rd"
            },
             {
              "latitude": 34.000999,
              "id": "267139123",
              "longitude": -118.005753,
              "name": "Coyote Trail- Hacienda Heights Trails"
            },
             {
              "latitude": 33.99527488,
              "id": "219445779",
              "longitude": -118.001542982,
              "name": "Top Of Turnbull Canyon"
            },
             {
              "latitude": 33.994408581,
              "id": "280332831",
              "longitude": -117.999462504,
              "name": "Turbo Canyon"
            },
             {
              "latitude": 33.994622632,
              "id": "262644368",
              "longitude": -118.00342019,
              "name": "Turnbull Canyon, Whittier"
            },
             {
              "latitude": 34.005179342,
              "id": "6361370",
              "longitude": -118.004287402,
              "name": "Turnbull Canyon Native Oak/Ahwingna Intersection"
            },
             {
              "latitude": 34.006165242,
              "id": "273195326",
              "longitude": -118.002441711,
              "name": "Hacienda Hills Hiking Trail"
            },
             {
              "latitude": 34.00653726,
              "id": "364898213",
              "longitude": -117.999501393,
              "name": "Orange Grove Trails"
            },
             {
              "latitude": 34.005507103,
              "id": "289390423",
              "longitude": -117.995441434,
              "name": "Coyote Trail"
            }
          ]
        }
```

# Sort array of locations by proximity, and begin making requests

# Request from client includes an object with following structure:

```
request = {
  min_timestamp: number,
  max_timestamp: number,
  locationID: 
}

var requestURL = 'https://api.instagram.com/v1/locations/' + request.locationID + '/media/recent?min_timestamp=' + request.min_timestamp +'&max_timestamp=' + request.max_timestamp;

```


#Sample Response from server:

```
  response.data = {
  
  "pagination":  {
    "next_url": "https://api.instagram.com/v1/locations/19440498/media/recent?access_token=9690147.1fb234f.94f4f9b5898e4991b987867c75e43102&min_timestamp=1413061158101&max_id=392932100951236164&max_timestamp=1413493114700",
    "next_max_id": "392932100951236164"
  },
  "meta":  {
    "code": 200
  },
  "data":  [
     {
      "attribution": null,
      "tags":  [
        "turnbullcanyon",
        "hellsgate",
        "satanism",
        "hauntedproperty",
        "antonlavey",
        "whittier",
        "spooooky"
      ],
      "type": "image",
      "location":  {
        "latitude": 34.000481139,
        "name": "Hells Gate",
        "longitude": -118.000284424,
        "id": 19440498
      },
      "comments":  {
        "count": 2,
        "data":  [
           {
            "created_time": "1383519562",
            "text": "Ur first time?? That place scares the shit outta me!!",
            "from":  {
              "username": "jennifer_nikki",
              "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xaf1/1171020_450829278389780_2029699699_a.jpg",
              "id": "438306286",
              "full_name": "JxQx"
            },
            "id": "581326682169103374"
          },
           {
            "created_time": "1383519672",
            "text": "It's not that scary. Well... The pit bull behind the gate was a little!",
            "from":  {
              "username": "eroe138",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_224717388_75sq_1392921665.jpg",
              "id": "224717388",
              "full_name": "adam gutierrez"
            },
            "id": "581327608304981048"
          }
        ]
      },
      "filter": "Normal",
      "created_time": "1383519130",
      "link": "http://instagram.com/p/gRRj3zpVbe/",
      "likes":  {
        "count": 12,
        "data":  [
           {
            "username": "samification",
            "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xpa1/925559_339811059500148_1437751694_a.jpg",
            "id": "287622818",
            "full_name": "Sam Washington"
          },
           {
            "username": "misfit_marissa",
            "profile_picture": "http://photos-a.ak.instagram.com/hphotos-ak-xfa1/10734998_1497456700513656_1608804856_a.jpg",
            "id": "30703676",
            "full_name": "misfit_marissa"
          },
           {
            "username": "taytay2_7",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_184123081_75sq_1375148672.jpg",
            "id": "184123081",
            "full_name": "Taylor Allen"
          }
        ]
      },
      "images":  {
        "low_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xap1/t51.2885-15/1209667_463966173722323_592211838_a.jpg",
          "width": 306,
          "height": 306
        },
        "thumbnail":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xap1/t51.2885-15/1209667_463966173722323_592211838_s.jpg",
          "width": 150,
          "height": 150
        },
        "standard_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xap1/t51.2885-15/1209667_463966173722323_592211838_n.jpg",
          "width": 640,
          "height": 640
        }
      },
      "users_in_photo":  [],
      "caption":  {
        "created_time": "1383519130",
        "text": "Diannie and I found #HellsGate after our morning hike!!! Best Anniversary date ever!!! #TurnbullCanyon #Whittier #hauntedproperty #spooooky #AntonLaVey #Satanism",
        "from":  {
          "username": "eroe138",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_224717388_75sq_1392921665.jpg",
          "id": "224717388",
          "full_name": "adam gutierrez"
        },
        "id": "581325778481141739"
      },
      "user_has_liked": false,
      "id": "581323058802153182_224717388",
      "user":  {
        "username": "eroe138",
        "website": "",
        "profile_picture": "http://images.ak.instagram.com/profiles/profile_224717388_75sq_1392921665.jpg",
        "full_name": "adam gutierrez",
        "bio": "",
        "id": "224717388"
      }
    },
     {
      "attribution": null,
      "tags":  [],
      "type": "image",
      "location":  {
        "latitude": 34.000481139,
        "name": "Hells Gate",
        "longitude": -118.000284424,
        "id": 19440498
      },
      "comments":  {
        "count": 1,
        "data":  [
           {
            "created_time": "1374351802",
            "text": "Ha! I love that little creep! Just snapped that same pic the other day!",
            "from":  {
              "username": "babeblackburn",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_27620966_75sq_1361254601.jpg",
              "id": "27620966",
              "full_name": "babeblackburn"
            },
            "id": "504421938441652106"
          }
        ]
      },
      "filter": "Amaro",
      "created_time": "1374351659",
      "link": "http://instagram.com/p/cAD_0nOocI/",
      "likes":  {
        "count": 7,
        "data":  [
           {
            "username": "masterpieces562",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_35071851_75sq_1339995113.jpg",
            "id": "35071851",
            "full_name": "Ulises Vazquez"
          },
           {
            "username": "wagoneer76",
            "profile_picture": "http://photos-f.ak.instagram.com/hphotos-ak-xpa1/10508063_1503209746562781_244527130_a.jpg",
            "id": "42195879",
            "full_name": "wagoneer76"
          },
           {
            "username": "babeblackburn",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_27620966_75sq_1361254601.jpg",
            "id": "27620966",
            "full_name": "babeblackburn"
          },
           {
            "username": "dannymccoy85",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_219456807_75sq_1396936444.jpg",
            "id": "219456807",
            "full_name": "Danny Mccoy"
          }
        ]
      },
      "images":  {
        "low_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xaf1/outbound-distilleryimage8/t0.0-17/OBPTH/e4243e00f17911e2a31922000a1fbcdc_6.jpg",
          "width": 306,
          "height": 306
        },
        "thumbnail":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xaf1/outbound-distilleryimage8/t0.0-17/OBPTH/e4243e00f17911e2a31922000a1fbcdc_5.jpg",
          "width": 150,
          "height": 150
        },
        "standard_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xaf1/outbound-distilleryimage8/t0.0-17/OBPTH/e4243e00f17911e2a31922000a1fbcdc_7.jpg",
          "width": 612,
          "height": 612
        }
      },
      "users_in_photo":  [],
      "caption":  {
        "created_time": "1374351659",
        "text": "On our way to hollyweird and this little guy always catches my eyes downtown 101.",
        "from":  {
          "username": "drew_the_torch_slayer",
          "profile_picture": "http://images.ak.instagram.com/profiles/profile_32998744_75sq_1376067325.jpg",
          "id": "32998744",
          "full_name": "Andrew Michael Trinidad"
        },
        "id": "504421232397682543"
      },
      "user_has_liked": false,
      "id": "504420738224785160_32998744",
      "user":  {
        "username": "drew_the_torch_slayer",
        "website": "",
        "profile_picture": "http://images.ak.instagram.com/profiles/profile_32998744_75sq_1376067325.jpg",
        "full_name": "Andrew Michael Trinidad",
        "bio": "",
        "id": "32998744"
      }
    },
     {
      "attribution": null,
      "tags":  [
        "hellsgates"
      ],
      "type": "image",
      "location":  {
        "latitude": 34.000481139,
        "name": "Hells Gate",
        "longitude": -118.000284424,
        "id": 19440498
      },
      "comments":  {
        "count": 2,
        "data":  [
           {
            "created_time": "1373254661",
            "text": "What is that place?",
            "from":  {
              "username": "jjlara86",
              "profile_picture": "http://photos-h.ak.instagram.com/hphotos-ak-xfp1/10467775_689333101132751_1795032643_a.jpg",
              "id": "144142106",
              "full_name": "Juan Lara"
            },
            "id": "495218455117707105"
          },
           {
            "created_time": "1373262557",
            "text": "@pc_restrepo we didn't go in, there's cameras & it's all gated & it has Barb wire",
            "from":  {
              "username": "_andreaseesyou",
              "profile_picture": "http://photos-d.ak.instagram.com/hphotos-ak-xfa1/10632176_1642345549325331_281905676_a.jpg",
              "id": "3910140",
              "full_name": "_andreaseesyou"
            },
            "id": "495284690769557118"
          }
        ]
      },
      "filter": "Brannan",
      "created_time": "1373252588",
      "link": "http://instagram.com/p/bfTr6qgjXA/",
      "likes":  {
        "count": 37,
        "data":  [
           {
            "username": "leeoops",
            "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xaf1/10611192_400616450092724_1942360196_a.jpg",
            "id": "248508753",
            "full_name": "Lee Ward!😎"
          },
           {
            "username": "mr_xraided29",
            "profile_picture": "http://photos-f.ak.instagram.com/hphotos-ak-xpa1/928649_787661877942933_130929669_a.jpg",
            "id": "288940540",
            "full_name": "Eduardo Alvarez"
          },
           {
            "username": "ryrysadler",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_371206877_75sq_1376089651.jpg",
            "id": "371206877",
            "full_name": "Ryan George Sadler"
          }
        ]
      },
      "images":  {
        "low_resolution":  {
          "url": "http://scontent-b.cdninstagram.com/hphotos-xap1/outbound-distilleryimage4/t0.0-17/OBPTH/eaf3e770e77a11e2a73722000a1f9317_6.jpg",
          "width": 306,
          "height": 306
        },
        "thumbnail":  {
          "url": "http://scontent-b.cdninstagram.com/hphotos-xap1/outbound-distilleryimage4/t0.0-17/OBPTH/eaf3e770e77a11e2a73722000a1f9317_5.jpg",
          "width": 150,
          "height": 150
        },
        "standard_resolution":  {
          "url": "http://scontent-b.cdninstagram.com/hphotos-xap1/outbound-distilleryimage4/t0.0-17/OBPTH/eaf3e770e77a11e2a73722000a1f9317_7.jpg",
          "width": 612,
          "height": 612
        }
      },
      "users_in_photo":  [
         {
          "position":  {
            "y": 0.349673212,
            "x": 0.325163394
          },
          "user":  {
            "username": "staytrue187",
            "profile_picture": "http://photos-f.ak.instagram.com/hphotos-ak-xpa1/10448954_668106076606109_1987363171_a.jpg",
            "id": "229514505",
            "full_name": "staytrue187"
          }
        },
         {
          "position":  {
            "y": 0.367647052,
            "x": 0.504901946
          },
          "user":  {
            "username": "esko626",
            "profile_picture": "http://photos-a.ak.instagram.com/hphotos-ak-xaf1/10597264_263870143810376_417082687_a.jpg",
            "id": "51759032",
            "full_name": "esko626"
          }
        },
         {
          "position":  {
            "y": 0.516339898,
            "x": 0.405228764
          },
          "user":  {
            "username": "chrissv19",
            "profile_picture": "http://photos-g.ak.instagram.com/hphotos-ak-xap1/10507917_1396823770542518_871228577_a.jpg",
            "id": "41778585",
            "full_name": "chrissv19"
          }
        }
      ],
      "caption":  {
        "created_time": "1373252588",
        "text": "Stranded in Front of #HellsGates . Watching us with The Camera's.",
        "from":  {
          "username": "_andreaseesyou",
          "profile_picture": "http://photos-d.ak.instagram.com/hphotos-ak-xfa1/10632176_1642345549325331_281905676_a.jpg",
          "id": "3910140",
          "full_name": "_andreaseesyou"
        },
        "id": "495202248318662621"
      },
      "user_has_liked": false,
      "id": "495201064845456832_3910140",
      "user":  {
        "username": "_andreaseesyou",
        "website": "",
        "profile_picture": "http://photos-d.ak.instagram.com/hphotos-ak-xfa1/10632176_1642345549325331_281905676_a.jpg",
        "full_name": "_andreaseesyou",
        "bio": "",
        "id": "3910140"
      }
    },
     {
      "attribution": null,
      "tags":  [
        "terrorizing"
      ],
      "type": "image",
      "location":  {
        "latitude": 34.000481139,
        "name": "Hells Gate",
        "longitude": -118.000284424,
        "id": 19440498
      },
      "comments":  {
        "count": 1,
        "data":  [
           {
            "created_time": "1369709664",
            "text": "I wanna go",
            "from":  {
              "username": "anitakinks",
              "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xfa1/10729298_1498931590359340_139724401_a.jpg",
              "id": "38196025",
              "full_name": "anitakinks"
            },
            "id": "465480858619091982"
          }
        ]
      },
      "filter": "Unknown",
      "created_time": "1369709263",
      "link": "http://instagram.com/p/Z1tVHzvB4J/",
      "likes":  {
        "count": 14,
        "data":  [
           {
            "username": "anitakinks",
            "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xfa1/10729298_1498931590359340_139724401_a.jpg",
            "id": "38196025",
            "full_name": "anitakinks"
          },
           {
            "username": "brennanie56",
            "profile_picture": "http://photos-f.ak.instagram.com/hphotos-ak-xpf1/10546913_303197006517797_79301084_a.jpg",
            "id": "214750051",
            "full_name": "Brennen Sonnier"
          },
           {
            "username": "stephcobian",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_55455884_75sq_1399109931.jpg",
            "id": "55455884",
            "full_name": "Stephanie Cobian"
          },
           {
            "username": "alcaraz22",
            "profile_picture": "http://images.ak.instagram.com/profiles/profile_36883438_75sq_1391722236.jpg",
            "id": "36883438",
            "full_name": "alcaraz22"
          }
        ]
      },
      "images":  {
        "low_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage9/t0.0-17/OBPTH/f8a7143cc74011e2b61322000a1f9358_6.jpg",
          "width": 306,
          "height": 306
        },
        "thumbnail":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage9/t0.0-17/OBPTH/f8a7143cc74011e2b61322000a1f9358_5.jpg",
          "width": 150,
          "height": 150
        },
        "standard_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage9/t0.0-17/OBPTH/f8a7143cc74011e2b61322000a1f9358_7.jpg",
          "width": 612,
          "height": 612
        }
      },
      "users_in_photo":  [],
      "caption":  {
        "created_time": "1369709263",
        "text": "#terrorizing",
        "from":  {
          "username": "lizziie_bear",
          "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xpa1/10546820_546171562174980_894169401_a.jpg",
          "id": "8668846",
          "full_name": "lizziie_bear"
        },
        "id": "465477756058869609"
      },
      "user_has_liked": false,
      "id": "465477500088884745_8668846",
      "user":  {
        "username": "lizziie_bear",
        "website": "",
        "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xpa1/10546820_546171562174980_894169401_a.jpg",
        "full_name": "lizziie_bear",
        "bio": "",
        "id": "8668846"
      }
    },
     {
      "attribution": null,
      "tags":  [],
      "type": "image",
      "location":  {
        "latitude": 34.000481139,
        "name": "Hells Gate",
        "longitude": -118.000284424,
        "id": 19440498
      },
      "comments":  {
        "count": 2,
        "data":  [
           {
            "created_time": "1364506656",
            "text": "That place is stupid @joshuaoverdose",
            "from":  {
              "username": "adybabee",
              "profile_picture": "http://photos-b.ak.instagram.com/hphotos-ak-xfa1/10724210_786407778089753_288082569_a.jpg",
              "id": "223701104",
              "full_name": "ａｄｙｂａｂｅｅ"
            },
            "id": "421834864008021295"
          },
           {
            "created_time": "1364506797",
            "text": "Turbul cañon ???",
            "from":  {
              "username": "juanelpan",
              "profile_picture": "http://images.ak.instagram.com/profiles/profile_36787314_75sq_1397068100.jpg",
              "id": "36787314",
              "full_name": "Juanelpan"
            },
            "id": "421836049125393780"
          }
        ]
      },
      "filter": "Normal",
      "created_time": "1364506500",
      "link": "http://instagram.com/p/Xap2O7EsbB/",
      "likes":  {
        "count": 22,
        "data":  [
           {
            "username": "alvvyskates",
            "profile_picture": "http://photos-h.ak.instagram.com/hphotos-ak-xaf1/10691800_1543008719246007_1417816096_a.jpg",
            "id": "15484097",
            "full_name": "Alvy."
          },
           {
            "username": "jjjaaaayyyyy",
            "profile_picture": "http://photos-h.ak.instagram.com/hphotos-ak-xfa1/10731512_515188291951879_2031580384_a.jpg",
            "id": "196109754",
            "full_name": "jjjaaaayyyyy"
          },
           {
            "username": "rickyxsan",
            "profile_picture": "http://photos-b.ak.instagram.com/hphotos-ak-xap1/927112_765426530175945_1462485166_a.jpg",
            "id": "21006244",
            "full_name": "Diploxsan"
          }
        ]
      },
      "images":  {
        "low_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage5/t0.0-17/OBPTH/584def0e97ef11e2b5f422000a1f9a34_6.jpg",
          "width": 306,
          "height": 306
        },
        "thumbnail":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage5/t0.0-17/OBPTH/584def0e97ef11e2b5f422000a1f9a34_5.jpg",
          "width": 150,
          "height": 150
        },
        "standard_resolution":  {
          "url": "http://scontent-a.cdninstagram.com/hphotos-xpa1/outbound-distilleryimage5/t0.0-17/OBPTH/584def0e97ef11e2b5f422000a1f9a34_7.jpg",
          "width": 612,
          "height": 612
        }
      },
      "users_in_photo":  [],
      "caption": null,
      "user_has_liked": false,
      "id": "421833561894733505_44966200",
      "user":  {
        "username": "herbajosh",
        "website": "",
        "profile_picture": "http://photos-e.ak.instagram.com/hphotos-ak-xfa1/10632179_1616496548577268_331756581_a.jpg",
        "full_name": "Wellness Coach",
        "bio": "",
        "id": "44966200"
      }
    }
  ]
}
```

#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
#########################################################
## Twitter

Request from client includes an object with following structure:


https://api.twitter.com/1.1/search/tweets.json?q=rawoakland&count=5

  {
  "statuses": [
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Fri Oct 17 02:45:23 +0000 2014",
      "id": 522941414611910660,
      "id_str": "522941414611910656",
      "text": "Good signage. http://t.co/VxzXpzlmQV",
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 2208440312,
        "id_str": "2208440312",
        "name": "Roger Williams",
        "screen_name": "rawoakland",
        "location": "",
        "profile_location": null,
        "description": "You go first.......",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 10,
        "friends_count": 16,
        "listed_count": 0,
        "created_at": "Fri Nov 22 06:23:46 +0000 2013",
        "favourites_count": 3,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 49,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "C0DEED",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/378800000773181372/36073ff918073165739d1d2fcd83cf34_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/378800000773181372/36073ff918073165739d1d2fcd83cf34_normal.jpeg",
        "profile_link_color": "0084B4",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": true,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "urls": [],
        "user_mentions": [],
        "media": [
          {
            "id": 522941413953384450,
            "id_str": "522941413953384448",
            "indices": [
              14,
              36
            ],
            "media_url": "http://pbs.twimg.com/media/B0HccgEIMAA602F.jpg",
            "media_url_https": "https://pbs.twimg.com/media/B0HccgEIMAA602F.jpg",
            "url": "http://t.co/VxzXpzlmQV",
            "display_url": "pic.twitter.com/VxzXpzlmQV",
            "expanded_url": "http://twitter.com/rawoakland/status/522941414611910656/photo/1",
            "type": "photo",
            "sizes": {
              "small": {
                "w": 340,
                "h": 340,
                "resize": "fit"
              },
              "medium": {
                "w": 600,
                "h": 600,
                "resize": "fit"
              },
              "thumb": {
                "w": 150,
                "h": 150,
                "resize": "crop"
              },
              "large": {
                "w": 1024,
                "h": 1024,
                "resize": "fit"
              }
            }
          }
        ]
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "und",
        "result_type": "recent"
      },
      "created_at": "Tue Oct 14 00:23:14 +0000 2014",
      "id": 521818477162545150,
      "id_str": "521818477162545153",
      "text": "#LostFiles #RawOakland http://t.co/5nT5NYbpr3",
      "source": "<a href=\"http://instagram.com\" rel=\"nofollow\">Instagram</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 16689307,
        "id_str": "16689307",
        "name": "MsTiffdoesit",
        "screen_name": "TiffNay",
        "location": "Bay Area, California",
        "profile_location": null,
        "description": "Life at its essence boils down to one day at a time. Today is the day- Cherish the day!  #God1st  #Family1st  #TeamCowboys  #TeamLakers  Don't ya just ❤ it!",
        "url": "https://t.co/d3RXFQThAu",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/d3RXFQThAu",
                "expanded_url": "https://twitter.com/TiffNay",
                "display_url": "twitter.com/TiffNay",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 324,
        "friends_count": 471,
        "listed_count": 13,
        "created_at": "Fri Oct 10 21:24:56 +0000 2008",
        "favourites_count": 11,
        "utc_offset": -25200,
        "time_zone": "Pacific Time (US & Canada)",
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 3743,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "642D8B",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/51702274/Photo_44.jpg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/51702274/Photo_44.jpg",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/2551297073/image_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/2551297073/image_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/16689307/1355113833",
        "profile_link_color": "FF0000",
        "profile_sidebar_border_color": "65B0DA",
        "profile_sidebar_fill_color": "7AC3EE",
        "profile_text_color": "3D1957",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "LostFiles",
            "indices": [
              0,
              10
            ]
          },
          {
            "text": "RawOakland",
            "indices": [
              11,
              22
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/5nT5NYbpr3",
            "expanded_url": "http://instagram.com/p/uHNbymI_4T/",
            "display_url": "instagram.com/p/uHNbymI_4T/",
            "indices": [
              23,
              45
            ]
          }
        ],
        "user_mentions": []
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "und"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 13 22:11:39 +0000 2014",
      "id": 521785364579504100,
      "id_str": "521785364579504128",
      "text": "Nothing comes between Tiff &amp; the music!! #Goodtimes #RawOakland #bailamos 🎶🎶💃 http://t.co/orCxth3NzC",
      "source": "<a href=\"http://instagram.com\" rel=\"nofollow\">Instagram</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 16689307,
        "id_str": "16689307",
        "name": "MsTiffdoesit",
        "screen_name": "TiffNay",
        "location": "Bay Area, California",
        "profile_location": null,
        "description": "Life at its essence boils down to one day at a time. Today is the day- Cherish the day!  #God1st  #Family1st  #TeamCowboys  #TeamLakers  Don't ya just ❤ it!",
        "url": "https://t.co/d3RXFQThAu",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https://t.co/d3RXFQThAu",
                "expanded_url": "https://twitter.com/TiffNay",
                "display_url": "twitter.com/TiffNay",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 324,
        "friends_count": 471,
        "listed_count": 13,
        "created_at": "Fri Oct 10 21:24:56 +0000 2008",
        "favourites_count": 11,
        "utc_offset": -25200,
        "time_zone": "Pacific Time (US & Canada)",
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 3743,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "642D8B",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/51702274/Photo_44.jpg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/51702274/Photo_44.jpg",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/2551297073/image_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/2551297073/image_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/16689307/1355113833",
        "profile_link_color": "FF0000",
        "profile_sidebar_border_color": "65B0DA",
        "profile_sidebar_fill_color": "7AC3EE",
        "profile_text_color": "3D1957",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "Goodtimes",
            "indices": [
              45,
              55
            ]
          },
          {
            "text": "RawOakland",
            "indices": [
              56,
              67
            ]
          },
          {
            "text": "bailamos",
            "indices": [
              68,
              77
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/orCxth3NzC",
            "expanded_url": "http://instagram.com/p/uG-YF7o_xi/",
            "display_url": "instagram.com/p/uG-YF7o_xi/",
            "indices": [
              82,
              104
            ]
          }
        ],
        "user_mentions": []
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 13 19:04:36 +0000 2014",
      "id": 521738288453808100,
      "id_str": "521738288453808128",
      "text": "RT @OMAYGA: S/O @djdsharp for spinning #GetIt at #RAWOakland today #PrideAndPurpose available now #TeamP360 http://t.co/tlv6jDaWRG",
      "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 1491215971,
        "id_str": "1491215971",
        "name": "P360 Entertainment",
        "screen_name": "P360ENT",
        "location": "#TeamP360",
        "profile_location": null,
        "description": "@OMAYGA @YoungChizle @Kazmek510 @RellStayfFly @steveyung415",
        "url": null,
        "entities": {
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 116,
        "friends_count": 276,
        "listed_count": 0,
        "created_at": "Fri Jun 07 20:04:36 +0000 2013",
        "favourites_count": 0,
        "utc_offset": -25200,
        "time_zone": "Arizona",
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 162,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "1A1B1F",
        "profile_background_image_url": "http://abs.twimg.com/images/themes/theme9/bg.gif",
        "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme9/bg.gif",
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/504132660050923520/f69el2hb_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/504132660050923520/f69el2hb_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/1491215971/1388854647",
        "profile_link_color": "2FC2EF",
        "profile_sidebar_border_color": "181A1E",
        "profile_sidebar_fill_color": "252429",
        "profile_text_color": "666666",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweeted_status": {
        "metadata": {
          "iso_language_code": "en",
          "result_type": "recent"
        },
        "created_at": "Mon Oct 13 05:20:35 +0000 2014",
        "id": 521530918805057540,
        "id_str": "521530918805057536",
        "text": "S/O @djdsharp for spinning #GetIt at #RAWOakland today #PrideAndPurpose available now #TeamP360 http://t.co/tlv6jDaWRG",
        "source": "<a href=\"http://twitter.com/download/iphone\" rel=\"nofollow\">Twitter for iPhone</a>",
        "truncated": false,
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
          "id": 19721515,
          "id_str": "19721515",
          "name": "John OMAYGA Adams",
          "screen_name": "OMAYGA",
          "location": "Rich City,USA",
          "profile_location": null,
          "description": "ig realomayga | Like on FB http://t.co/SCzPUv0ATC #PrideAndPurpose available now Follow @P360Ent #TeamP360",
          "url": "https://t.co/yhJtu6DJE1",
          "entities": {
            "url": {
              "urls": [
                {
                  "url": "https://t.co/yhJtu6DJE1",
                  "expanded_url": "https://itunes.apple.com/us/album/pride-and-purpose/id916612364",
                  "display_url": "itunes.apple.com/us/album/pride…",
                  "indices": [
                    0,
                    23
                  ]
                }
              ]
            },
            "description": {
              "urls": [
                {
                  "url": "http://t.co/SCzPUv0ATC",
                  "expanded_url": "http://www.facebook.com/omaygamusic",
                  "display_url": "facebook.com/omaygamusic",
                  "indices": [
                    27,
                    49
                  ]
                }
              ]
            }
          },
          "protected": false,
          "followers_count": 1315,
          "friends_count": 1012,
          "listed_count": 16,
          "created_at": "Thu Jan 29 17:24:34 +0000 2009",
          "favourites_count": 26,
          "utc_offset": -14400,
          "time_zone": "Eastern Time (US & Canada)",
          "geo_enabled": true,
          "verified": false,
          "statuses_count": 11483,
          "lang": "en",
          "contributors_enabled": false,
          "is_translator": false,
          "is_translation_enabled": false,
          "profile_background_color": "1A1B1F",
          "profile_background_image_url": "http://abs.twimg.com/images/themes/theme9/bg.gif",
          "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme9/bg.gif",
          "profile_background_tile": true,
          "profile_image_url": "http://pbs.twimg.com/profile_images/504132308027199488/B8qBQo6v_normal.jpeg",
          "profile_image_url_https": "https://pbs.twimg.com/profile_images/504132308027199488/B8qBQo6v_normal.jpeg",
          "profile_banner_url": "https://pbs.twimg.com/profile_banners/19721515/1391641204",
          "profile_link_color": "2FC2EF",
          "profile_sidebar_border_color": "FFFFFF",
          "profile_sidebar_fill_color": "252429",
          "profile_text_color": "666666",
          "profile_use_background_image": false,
          "default_profile": false,
          "default_profile_image": false,
          "following": false,
          "follow_request_sent": false,
          "notifications": false
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweet_count": 1,
        "favorite_count": 0,
        "entities": {
          "hashtags": [
            {
              "text": "GetIt",
              "indices": [
                27,
                33
              ]
            },
            {
              "text": "RAWOakland",
              "indices": [
                37,
                48
              ]
            },
            {
              "text": "PrideAndPurpose",
              "indices": [
                55,
                71
              ]
            },
            {
              "text": "TeamP360",
              "indices": [
                86,
                95
              ]
            }
          ],
          "symbols": [],
          "urls": [
            {
              "url": "http://t.co/tlv6jDaWRG",
              "expanded_url": "http://instagram.com/p/uFIfapE2Td/",
              "display_url": "instagram.com/p/uFIfapE2Td/",
              "indices": [
                96,
                118
              ]
            }
          ],
          "user_mentions": [
            {
              "screen_name": "djdsharp",
              "name": "D Sharp",
              "id": 21799988,
              "id_str": "21799988",
              "indices": [
                4,
                13
              ]
            }
          ]
        },
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "lang": "en"
      },
      "retweet_count": 1,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "GetIt",
            "indices": [
              39,
              45
            ]
          },
          {
            "text": "RAWOakland",
            "indices": [
              49,
              60
            ]
          },
          {
            "text": "PrideAndPurpose",
            "indices": [
              67,
              83
            ]
          },
          {
            "text": "TeamP360",
            "indices": [
              98,
              107
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/tlv6jDaWRG",
            "expanded_url": "http://instagram.com/p/uFIfapE2Td/",
            "display_url": "instagram.com/p/uFIfapE2Td/",
            "indices": [
              108,
              130
            ]
          }
        ],
        "user_mentions": [
          {
            "screen_name": "OMAYGA",
            "name": "John OMAYGA Adams",
            "id": 19721515,
            "id_str": "19721515",
            "indices": [
              3,
              10
            ]
          },
          {
            "screen_name": "djdsharp",
            "name": "D Sharp",
            "id": 21799988,
            "id_str": "21799988",
            "indices": [
              16,
              25
            ]
          }
        ]
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    },
    {
      "metadata": {
        "iso_language_code": "en",
        "result_type": "recent"
      },
      "created_at": "Mon Oct 13 17:17:08 +0000 2014",
      "id": 521711245251321860,
      "id_str": "521711245251321858",
      "text": "Photo: Loved ONES #rawoakland http://t.co/sn8eKwcwZC",
      "source": "<a href=\"http://www.tumblr.com/\" rel=\"nofollow\">Tumblr</a>",
      "truncated": false,
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 23848155,
        "id_str": "23848155",
        "name": "little RED CORVETTE",
        "screen_name": "_RED_Corvette",
        "location": "Back in that BAY BAY",
        "profile_location": null,
        "description": "RED CORVETTE (Femme DJ)\n\nInsta: theehippiefiles",
        "url": "http://t.co/sj6zEWLJLo",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "http://t.co/sj6zEWLJLo",
                "expanded_url": "http://alltheethingsred.com",
                "display_url": "alltheethingsred.com",
                "indices": [
                  0,
                  22
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 1193,
        "friends_count": 855,
        "listed_count": 23,
        "created_at": "Wed Mar 11 22:59:15 +0000 2009",
        "favourites_count": 78,
        "utc_offset": -25200,
        "time_zone": "Pacific Time (US & Canada)",
        "geo_enabled": true,
        "verified": false,
        "statuses_count": 49618,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "131516",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/149146303/lil-kim-3-Copy.png",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/149146303/lil-kim-3-Copy.png",
        "profile_background_tile": true,
        "profile_image_url": "http://pbs.twimg.com/profile_images/3675970140/adc7a6398afc358242821e91fb3d2036_normal.jpeg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/3675970140/adc7a6398afc358242821e91fb3d2036_normal.jpeg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/23848155/1396377159",
        "profile_link_color": "009999",
        "profile_sidebar_border_color": "EEEEEE",
        "profile_sidebar_fill_color": "EFEFEF",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": true,
        "follow_request_sent": false,
        "notifications": false
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          {
            "text": "rawoakland",
            "indices": [
              18,
              29
            ]
          }
        ],
        "symbols": [],
        "urls": [
          {
            "url": "http://t.co/sn8eKwcwZC",
            "expanded_url": "http://tmblr.co/ZbzEMy1T3bx_t",
            "display_url": "tmblr.co/ZbzEMy1T3bx_t",
            "indices": [
              30,
              52
            ]
          }
        ],
        "user_mentions": []
      },
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "lang": "en"
    }
  ],
  "search_metadata": {
    "completed_in": 0.073,
    "max_id": 522941414611910660,
    "max_id_str": "522941414611910656",
    "next_results": "?max_id=521711245251321857&q=rawOakland&count=5&include_entities=1",
    "query": "rawOakland",
    "refresh_url": "?since_id=522941414611910656&q=rawOakland&include_entities=1",
    "count": 5,
    "since_id": 0,
    "since_id_str": "0"
  }
}
#########################################################
