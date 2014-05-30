var express = require('express');
var path = require('path');
var http = require('http');

var deepCopy = function(nest) {
  var result = [];
  for (var i = 0; i < nest.length; i++) {
    result.push(nest[i].slice());
  }
  return result;
}

var pointsGenerator = function(num, rounds) {
  var points = [];
  thisRound = [];
  var i = 0;

  while (i < num) {
    thisRound.push([
      Math.random() * 90 + 5,
      Math.random() * 90 + 5,
      ]);
    i++;
  }

  points.push(thisRound);

  // make a copy of this round
  var nextRound = deepCopy(thisRound);

  for (var j = 0; j < rounds - 1; j++) {
    for (var k = 0; k < thisRound.length; k++) {
      for (var z = 0; z < 2; z++) {
        nextRound[k][z] += 40 * Math.random() - 20;
        nextRound[k][z] = Math.min(Math.max(nextRound[k][z], 5), 95);
      }
    }
    points.push(nextRound);
    nextRound = deepCopy(nextRound);
  }
  return points;
};


var app = express();

app.configure(function () {
	app.set('port', process.env.PORT || 4000);
	app.use(express.compress());
	app.use(express.logger('tiny')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, '../www')));
});


app.post('/user/add/:username/:domain', function(req, res) {
  console.log(req.params.username, req.params.domain);
  res.send({success: true});
});

app.get('/dummyData/send', function(req, res) {
  res.send({success: true});
});

// app.get('/dummyData', function(req, res) {
//   var points = pointsGenerator(10,10);
//   console.log(req.params.domain);
//   res.send({points: points});
// });

app.get('/dummyData', function(req, res) {
  res.send([
  {
    "_id": "5387a399d04551dc12e67c49",
    "username": "romie",
    "scores": [
      {
        "_id": "5387a399d04551dc12e67c4a",
        "version": "1.0",
        "y": 66,
        "x": 84,
        "created": "2014-05-29T21:16:09.138Z"
      },
      {
        "_id": "5387a399d04551dc12e67c4b",
        "version": "1.0",
        "y": 58,
        "x": 49,
        "created": "2014-05-29T21:16:09.270Z"
      },
      {
        "_id": "5387a399d04551dc12e67c4c",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:16:09.405Z"
      }
    ]
  },
  {
    "_id": "5387a399d04551dc12e67c4d",
    "username": "baruch",
    "scores": [
      {
        "_id": "5387a399d04551dc12e67c4e",
        "version": "1.0",
        "y": 66,
        "x": 52,
        "created": "2014-05-29T21:16:09.665Z"
      },
      {
        "_id": "5387a399d04551dc12e67c4f",
        "version": "1.0",
        "y": 73,
        "x": 82,
        "created": "2014-05-29T21:16:09.799Z"
      },
      {
        "_id": "5387a399d04551dc12e67c50",
        "version": "1.0",
        "y": 16,
        "x": 9,
        "created": "2014-05-29T21:16:09.929Z"
      }
    ]
  },
  {
    "_id": "5387a39ad04551dc12e67c51",
    "username": "nikola",
    "scores": [
      {
        "_id": "5387a39ad04551dc12e67c52",
        "version": "1.0",
        "y": 60,
        "x": 61,
        "created": "2014-05-29T21:16:10.197Z"
      },
      {
        "_id": "5387a39ad04551dc12e67c53",
        "version": "1.0",
        "y": 71,
        "x": 77,
        "created": "2014-05-29T21:16:10.330Z"
      },
      {
        "_id": "5387a39ad04551dc12e67c54",
        "version": "1.0",
        "y": 22,
        "x": 36,
        "created": "2014-05-29T21:16:10.474Z"
      }
    ]
  },
  {
    "_id": "5387a39ad04551dc12e67c55",
    "username": "marili",
    "scores": [
      {
        "_id": "5387a39ad04551dc12e67c56",
        "version": "1.0",
        "y": 79,
        "x": 83,
        "created": "2014-05-29T21:16:10.743Z"
      },
      {
        "_id": "5387a39ad04551dc12e67c57",
        "version": "1.0",
        "y": 75,
        "x": 57,
        "created": "2014-05-29T21:16:10.874Z"
      },
      {
        "_id": "5387a39bd04551dc12e67c58",
        "version": "1.0",
        "y": 67,
        "x": 67,
        "created": "2014-05-29T21:16:11.024Z"
      }
    ]
  },
  {
    "_id": "5387a39bd04551dc12e67c59",
    "username": "eva",
    "scores": [
      {
        "_id": "5387a39bd04551dc12e67c5a",
        "version": "1.0",
        "y": 77,
        "x": 82,
        "created": "2014-05-29T21:16:11.328Z"
      },
      {
        "_id": "5387a39bd04551dc12e67c5b",
        "version": "1.0",
        "y": 39,
        "x": 63,
        "created": "2014-05-29T21:16:11.465Z"
      },
      {
        "_id": "5387a39bd04551dc12e67c5c",
        "version": "1.0",
        "y": 67,
        "x": 82,
        "created": "2014-05-29T21:16:11.601Z"
      }
    ]
  },
  {
    "_id": "5387a39bd04551dc12e67c5d",
    "username": "avi",
    "scores": [
      {
        "_id": "5387a39bd04551dc12e67c5e",
        "version": "1.0",
        "y": 56,
        "x": 70,
        "created": "2014-05-29T21:16:11.865Z"
      },
      {
        "_id": "5387a39cd04551dc12e67c5f",
        "version": "1.0",
        "y": 71,
        "x": 73,
        "created": "2014-05-29T21:16:12.002Z"
      },
      {
        "_id": "5387a39cd04551dc12e67c60",
        "version": "1.0",
        "y": 67,
        "x": 75,
        "created": "2014-05-29T21:16:12.131Z"
      }
    ]
  },
  {
    "_id": "5387a39cd04551dc12e67c61",
    "username": "ramy",
    "scores": [
      {
        "_id": "5387a39cd04551dc12e67c62",
        "version": "1.0",
        "y": 24,
        "x": 10,
        "created": "2014-05-29T21:16:12.403Z"
      },
      {
        "_id": "5387a39cd04551dc12e67c63",
        "version": "1.0",
        "y": 58,
        "x": 83,
        "created": "2014-05-29T21:16:12.538Z"
      },
      {
        "_id": "5387a39cd04551dc12e67c64",
        "version": "1.0",
        "y": 77,
        "x": 87,
        "created": "2014-05-29T21:16:12.670Z"
      }
    ]
  },
  {
    "_id": "5387a39cd04551dc12e67c65",
    "username": "nikodem",
    "scores": [
      {
        "_id": "5387a39cd04551dc12e67c66",
        "version": "1.0",
        "y": 60,
        "x": 91,
        "created": "2014-05-29T21:16:12.937Z"
      },
      {
        "_id": "5387a39dd04551dc12e67c67",
        "version": "1.0",
        "y": 66,
        "x": 90,
        "created": "2014-05-29T21:16:13.065Z"
      },
      {
        "_id": "5387a39dd04551dc12e67c68",
        "version": "1.0",
        "y": 73,
        "x": 94,
        "created": "2014-05-29T21:16:13.195Z"
      }
    ]
  },
  {
    "_id": "5387a39dd04551dc12e67c69",
    "username": "gianny",
    "scores": [
      {
        "_id": "5387a39dd04551dc12e67c6a",
        "version": "1.0",
        "y": 39,
        "x": 1,
        "created": "2014-05-29T21:16:13.452Z"
      },
      {
        "_id": "5387a39dd04551dc12e67c6b",
        "version": "1.0",
        "y": 64,
        "x": 98,
        "created": "2014-05-29T21:16:13.583Z"
      },
      {
        "_id": "5387a39dd04551dc12e67c6c",
        "version": "1.0",
        "y": 13,
        "x": 7,
        "created": "2014-05-29T21:16:13.715Z"
      }
    ]
  },
  {
    "_id": "5387a39dd04551dc12e67c6d",
    "username": "taos",
    "scores": [
      {
        "_id": "5387a39dd04551dc12e67c6e",
        "version": "1.0",
        "y": 5,
        "x": 6,
        "created": "2014-05-29T21:16:13.977Z"
      },
      {
        "_id": "5387a39ed04551dc12e67c6f",
        "version": "1.0",
        "y": 69,
        "x": 78,
        "created": "2014-05-29T21:16:14.107Z"
      },
      {
        "_id": "5387a39ed04551dc12e67c70",
        "version": "1.0",
        "y": 62,
        "x": 65,
        "created": "2014-05-29T21:16:14.241Z"
      }
    ]
  },
  {
    "_id": "5387a39ed04551dc12e67c71",
    "username": "macklen",
    "scores": [
      {
        "_id": "5387a39ed04551dc12e67c72",
        "version": "1.0",
        "y": 3,
        "x": 7,
        "created": "2014-05-29T21:16:14.499Z"
      },
      {
        "_id": "5387a39ed04551dc12e67c73",
        "version": "1.0",
        "y": 62,
        "x": 70,
        "created": "2014-05-29T21:16:14.626Z"
      },
      {
        "_id": "5387a39ed04551dc12e67c74",
        "version": "1.0",
        "y": 43,
        "x": 54,
        "created": "2014-05-29T21:16:14.768Z"
      }
    ]
  },
  {
    "_id": "5387a39ed04551dc12e67c75",
    "username": "marcos",
    "scores": [
      {
        "_id": "5387a39fd04551dc12e67c76",
        "version": "1.0",
        "y": 30,
        "x": 19,
        "created": "2014-05-29T21:16:15.031Z"
      },
      {
        "_id": "5387a39fd04551dc12e67c77",
        "version": "1.0",
        "y": 96,
        "x": 91,
        "created": "2014-05-29T21:16:15.159Z"
      },
      {
        "_id": "5387a39fd04551dc12e67c78",
        "version": "1.0",
        "y": 75,
        "x": 82,
        "created": "2014-05-29T21:16:15.289Z"
      }
    ]
  },
  {
    "_id": "5387a39fd04551dc12e67c79",
    "username": "alvis",
    "scores": [
      {
        "_id": "5387a39fd04551dc12e67c7a",
        "version": "1.0",
        "y": 22,
        "x": 36,
        "created": "2014-05-29T21:16:15.556Z"
      },
      {
        "_id": "5387a39fd04551dc12e67c7b",
        "version": "1.0",
        "y": 66,
        "x": 74,
        "created": "2014-05-29T21:16:15.690Z"
      },
      {
        "_id": "5387a39fd04551dc12e67c7c",
        "version": "1.0",
        "y": 79,
        "x": 83,
        "created": "2014-05-29T21:16:15.820Z"
      }
    ]
  },
  {
    "_id": "5387a39fd04551dc12e67c7d",
    "username": "abelardo",
    "scores": [
      {
        "_id": "5387a3a0d04551dc12e67c7e",
        "version": "1.0",
        "y": 75,
        "x": 80,
        "created": "2014-05-29T21:16:16.069Z"
      },
      {
        "_id": "5387a3a0d04551dc12e67c7f",
        "version": "1.0",
        "y": 52,
        "x": 22,
        "created": "2014-05-29T21:16:16.200Z"
      },
      {
        "_id": "5387a3a0d04551dc12e67c80",
        "version": "1.0",
        "y": 11,
        "x": 9,
        "created": "2014-05-29T21:16:16.330Z"
      }
    ]
  },
  {
    "_id": "5387a3a0d04551dc12e67c81",
    "username": "ryanne",
    "scores": [
      {
        "_id": "5387a3a0d04551dc12e67c82",
        "version": "1.0",
        "y": 73,
        "x": 79,
        "created": "2014-05-29T21:16:16.593Z"
      },
      {
        "_id": "5387a3a0d04551dc12e67c83",
        "version": "1.0",
        "y": 28,
        "x": 7,
        "created": "2014-05-29T21:16:16.723Z"
      },
      {
        "_id": "5387a3a0d04551dc12e67c84",
        "version": "1.0",
        "y": 66,
        "x": 84,
        "created": "2014-05-29T21:16:16.852Z"
      }
    ]
  },
  {
    "_id": "5387a3a0d04551dc12e67c85",
    "username": "dain",
    "scores": [
      {
        "_id": "5387a3a1d04551dc12e67c86",
        "version": "1.0",
        "y": 73,
        "x": 94,
        "created": "2014-05-29T21:16:17.111Z"
      },
      {
        "_id": "5387a3a1d04551dc12e67c87",
        "version": "1.0",
        "y": 60,
        "x": 89,
        "created": "2014-05-29T21:16:17.241Z"
      },
      {
        "_id": "5387a3a1d04551dc12e67c88",
        "version": "1.0",
        "y": 13,
        "x": 17,
        "created": "2014-05-29T21:16:17.376Z"
      }
    ]
  },
  {
    "_id": "5387a3a1d04551dc12e67c89",
    "username": "mekai",
    "scores": [
      {
        "_id": "5387a3a1d04551dc12e67c8a",
        "version": "1.0",
        "y": 26,
        "x": 13,
        "created": "2014-05-29T21:16:17.633Z"
      },
      {
        "_id": "5387a3a1d04551dc12e67c8b",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:16:17.761Z"
      },
      {
        "_id": "5387a3a1d04551dc12e67c8c",
        "version": "1.0",
        "y": 62,
        "x": 78,
        "created": "2014-05-29T21:16:17.888Z"
      }
    ]
  },
  {
    "_id": "5387a3a2d04551dc12e67c8d",
    "username": "braedyn",
    "scores": [
      {
        "_id": "5387a3a2d04551dc12e67c8e",
        "version": "1.0",
        "y": 66,
        "x": 74,
        "created": "2014-05-29T21:16:18.148Z"
      },
      {
        "_id": "5387a3a2d04551dc12e67c8f",
        "version": "1.0",
        "y": 73,
        "x": 79,
        "created": "2014-05-29T21:16:18.273Z"
      },
      {
        "_id": "5387a3a2d04551dc12e67c90",
        "version": "1.0",
        "y": 64,
        "x": 75,
        "created": "2014-05-29T21:16:18.401Z"
      }
    ]
  },
  {
    "_id": "5387a3a2d04551dc12e67c91",
    "username": "kushal",
    "scores": [
      {
        "_id": "5387a3a2d04551dc12e67c92",
        "version": "1.0",
        "y": 5,
        "x": 6,
        "created": "2014-05-29T21:16:18.667Z"
      },
      {
        "_id": "5387a3a2d04551dc12e67c93",
        "version": "1.0",
        "y": 69,
        "x": 92,
        "created": "2014-05-29T21:16:18.801Z"
      },
      {
        "_id": "5387a3a2d04551dc12e67c94",
        "version": "1.0",
        "y": 22,
        "x": 10,
        "created": "2014-05-29T21:16:18.932Z"
      }
    ]
  },
  {
    "_id": "5387a3a3d04551dc12e67c95",
    "username": "evianna",
    "scores": [
      {
        "_id": "5387a3a3d04551dc12e67c96",
        "version": "1.0",
        "y": 60,
        "x": 89,
        "created": "2014-05-29T21:16:19.196Z"
      },
      {
        "_id": "5387a3a3d04551dc12e67c97",
        "version": "1.0",
        "y": 43,
        "x": 54,
        "created": "2014-05-29T21:16:19.327Z"
      },
      {
        "_id": "5387a3a3d04551dc12e67c98",
        "version": "1.0",
        "y": 58,
        "x": 78,
        "created": "2014-05-29T21:16:19.464Z"
      }
    ]
  },
  {
    "_id": "5387a3a3d04551dc12e67c99",
    "username": "ellysia",
    "scores": [
      {
        "_id": "5387a3a3d04551dc12e67c9a",
        "version": "1.0",
        "y": 79,
        "x": 83,
        "created": "2014-05-29T21:16:19.732Z"
      },
      {
        "_id": "5387a3a3d04551dc12e67c9b",
        "version": "1.0",
        "y": 7,
        "x": 7,
        "created": "2014-05-29T21:16:19.862Z"
      },
      {
        "_id": "5387a3a3d04551dc12e67c9c",
        "version": "1.0",
        "y": 37,
        "x": 37,
        "created": "2014-05-29T21:16:19.990Z"
      }
    ]
  },
  {
    "_id": "5387a3a4d04551dc12e67c9d",
    "username": "haidyn",
    "scores": [
      {
        "_id": "5387a3a4d04551dc12e67c9e",
        "version": "1.0",
        "y": 60,
        "x": 89,
        "created": "2014-05-29T21:16:20.247Z"
      },
      {
        "_id": "5387a3a4d04551dc12e67c9f",
        "version": "1.0",
        "y": 60,
        "x": 63,
        "created": "2014-05-29T21:16:20.379Z"
      },
      {
        "_id": "5387a3a4d04551dc12e67ca0",
        "version": "1.0",
        "y": 37,
        "x": 6,
        "created": "2014-05-29T21:16:20.507Z"
      }
    ]
  },
  {
    "_id": "5387a3a4d04551dc12e67ca1",
    "username": "britny",
    "scores": [
      {
        "_id": "5387a3a4d04551dc12e67ca2",
        "version": "1.0",
        "y": 28,
        "x": 4,
        "created": "2014-05-29T21:16:20.764Z"
      },
      {
        "_id": "5387a3a4d04551dc12e67ca3",
        "version": "1.0",
        "y": 32,
        "x": 18,
        "created": "2014-05-29T21:16:20.890Z"
      },
      {
        "_id": "5387a3a5d04551dc12e67ca4",
        "version": "1.0",
        "y": 30,
        "x": 11,
        "created": "2014-05-29T21:16:21.021Z"
      }
    ]
  },
  {
    "_id": "5387a3a5d04551dc12e67ca5",
    "username": "korin",
    "scores": [
      {
        "_id": "5387a3a5d04551dc12e67ca6",
        "version": "1.0",
        "y": 43,
        "x": 50,
        "created": "2014-05-29T21:16:21.276Z"
      },
      {
        "_id": "5387a3a5d04551dc12e67ca7",
        "version": "1.0",
        "y": 79,
        "x": 78,
        "created": "2014-05-29T21:16:21.404Z"
      },
      {
        "_id": "5387a3a5d04551dc12e67ca8",
        "version": "1.0",
        "y": 9,
        "x": 16,
        "created": "2014-05-29T21:16:21.535Z"
      }
    ]
  },
  {
    "_id": "5387a3a5d04551dc12e67ca9",
    "username": "jezabell",
    "scores": [
      {
        "_id": "5387a3a5d04551dc12e67caa",
        "version": "1.0",
        "y": 13,
        "x": 23,
        "created": "2014-05-29T21:16:21.789Z"
      },
      {
        "_id": "5387a3a5d04551dc12e67cab",
        "version": "1.0",
        "y": 22,
        "x": 10,
        "created": "2014-05-29T21:16:21.919Z"
      },
      {
        "_id": "5387a3a6d04551dc12e67cac",
        "version": "1.0",
        "y": 86,
        "x": 67,
        "created": "2014-05-29T21:16:22.046Z"
      }
    ]
  },
  {
    "_id": "5387a3a6d04551dc12e67cad",
    "username": "joannah",
    "scores": [
      {
        "_id": "5387a3a6d04551dc12e67cae",
        "version": "1.0",
        "y": 18,
        "x": 12,
        "created": "2014-05-29T21:16:22.319Z"
      },
      {
        "_id": "5387a3a6d04551dc12e67caf",
        "version": "1.0",
        "y": 66,
        "x": 88,
        "created": "2014-05-29T21:16:22.493Z"
      },
      {
        "_id": "5387a3a6d04551dc12e67cb0",
        "version": "1.0",
        "y": 69,
        "x": 78,
        "created": "2014-05-29T21:16:22.624Z"
      }
    ]
  },
  {
    "_id": "5387a3a6d04551dc12e67cb1",
    "username": "evaleen",
    "scores": [
      {
        "_id": "5387a3a6d04551dc12e67cb2",
        "version": "1.0",
        "y": 66,
        "x": 52,
        "created": "2014-05-29T21:16:22.909Z"
      },
      {
        "_id": "5387a3a7d04551dc12e67cb3",
        "version": "1.0",
        "y": 73,
        "x": 63,
        "created": "2014-05-29T21:16:23.037Z"
      },
      {
        "_id": "5387a3a7d04551dc12e67cb4",
        "version": "1.0",
        "y": 88,
        "x": 80,
        "created": "2014-05-29T21:16:23.195Z"
      }
    ]
  },
  {
    "_id": "5387a3a7d04551dc12e67cb5",
    "username": "zeena",
    "scores": [
      {
        "_id": "5387a3a7d04551dc12e67cb6",
        "version": "1.0",
        "y": 64,
        "x": 91,
        "created": "2014-05-29T21:16:23.453Z"
      },
      {
        "_id": "5387a3a7d04551dc12e67cb7",
        "version": "1.0",
        "y": 81,
        "x": 92,
        "created": "2014-05-29T21:16:23.588Z"
      },
      {
        "_id": "5387a3a7d04551dc12e67cb8",
        "version": "1.0",
        "y": 71,
        "x": 91,
        "created": "2014-05-29T21:16:23.720Z"
      }
    ]
  },
  {
    "_id": "5387a3a7d04551dc12e67cb9",
    "username": "nechemia",
    "scores": [
      {
        "_id": "5387a3a7d04551dc12e67cba",
        "version": "1.0",
        "y": 56,
        "x": 56,
        "created": "2014-05-29T21:16:23.982Z"
      },
      {
        "_id": "5387a3a8d04551dc12e67cbb",
        "version": "1.0",
        "y": 73,
        "x": 69,
        "created": "2014-05-29T21:16:24.108Z"
      },
      {
        "_id": "5387a3a8d04551dc12e67cbc",
        "version": "1.0",
        "y": 71,
        "x": 75,
        "created": "2014-05-29T21:16:24.241Z"
      }
    ]
  },
  {
    "_id": "5387a3a8d04551dc12e67cbd",
    "username": "saidee",
    "scores": [
      {
        "_id": "5387a3a8d04551dc12e67cbe",
        "version": "1.0",
        "y": 15,
        "x": 18,
        "created": "2014-05-29T21:16:24.495Z"
      },
      {
        "_id": "5387a3a8d04551dc12e67cbf",
        "version": "1.0",
        "y": 50,
        "x": 70,
        "created": "2014-05-29T21:16:24.633Z"
      },
      {
        "_id": "5387a3a8d04551dc12e67cc0",
        "version": "1.0",
        "y": 81,
        "x": 72,
        "created": "2014-05-29T21:16:24.763Z"
      }
    ]
  },
  {
    "_id": "5387a3a8d04551dc12e67cc1",
    "username": "yomna",
    "scores": [
      {
        "_id": "5387a3a9d04551dc12e67cc2",
        "version": "1.0",
        "y": 64,
        "x": 81,
        "created": "2014-05-29T21:16:25.025Z"
      },
      {
        "_id": "5387a3a9d04551dc12e67cc3",
        "version": "1.0",
        "y": 88,
        "x": 87,
        "created": "2014-05-29T21:16:25.159Z"
      },
      {
        "_id": "5387a3a9d04551dc12e67cc4",
        "version": "1.0",
        "y": 28,
        "x": 7,
        "created": "2014-05-29T21:16:25.295Z"
      }
    ]
  },
  {
    "_id": "5387a3a9d04551dc12e67cc5",
    "username": "timmothy",
    "scores": [
      {
        "_id": "5387a3a9d04551dc12e67cc6",
        "version": "1.0",
        "y": 73,
        "x": 69,
        "created": "2014-05-29T21:16:25.556Z"
      },
      {
        "_id": "5387a3a9d04551dc12e67cc7",
        "version": "1.0",
        "y": 50,
        "x": 70,
        "created": "2014-05-29T21:16:25.685Z"
      },
      {
        "_id": "5387a3a9d04551dc12e67cc8",
        "version": "1.0",
        "y": 20,
        "x": 6,
        "created": "2014-05-29T21:16:25.813Z"
      }
    ]
  },
  {
    "_id": "5387a3a9d04551dc12e67cc9",
    "username": "jory",
    "scores": [
      {
        "_id": "5387a3aad04551dc12e67cca",
        "version": "1.0",
        "y": 66,
        "x": 88,
        "created": "2014-05-29T21:16:26.105Z"
      },
      {
        "_id": "5387a3aad04551dc12e67ccb",
        "version": "1.0",
        "y": 60,
        "x": 61,
        "created": "2014-05-29T21:16:26.288Z"
      },
      {
        "_id": "5387a3aad04551dc12e67ccc",
        "version": "1.0",
        "y": 79,
        "x": 57,
        "created": "2014-05-29T21:16:26.447Z"
      }
    ]
  },
  {
    "_id": "5387a3aad04551dc12e67ccd",
    "username": "genny",
    "scores": [
      {
        "_id": "5387a3aad04551dc12e67cce",
        "version": "1.0",
        "y": 62,
        "x": 85,
        "created": "2014-05-29T21:16:26.733Z"
      },
      {
        "_id": "5387a3aad04551dc12e67ccf",
        "version": "1.0",
        "y": 64,
        "x": 75,
        "created": "2014-05-29T21:16:26.869Z"
      },
      {
        "_id": "5387a3abd04551dc12e67cd0",
        "version": "1.0",
        "y": 66,
        "x": 80,
        "created": "2014-05-29T21:16:27.012Z"
      }
    ]
  },
  {
    "_id": "5387a3abd04551dc12e67cd1",
    "username": "niah",
    "scores": [
      {
        "_id": "5387a3abd04551dc12e67cd2",
        "version": "1.0",
        "y": 77,
        "x": 82,
        "created": "2014-05-29T21:16:27.305Z"
      },
      {
        "_id": "5387a3abd04551dc12e67cd3",
        "version": "1.0",
        "y": 79,
        "x": 68,
        "created": "2014-05-29T21:16:27.494Z"
      },
      {
        "_id": "5387a3abd04551dc12e67cd4",
        "version": "1.0",
        "y": 62,
        "x": 91,
        "created": "2014-05-29T21:16:27.622Z"
      }
    ]
  },
  {
    "_id": "5387a3abd04551dc12e67cd5",
    "username": "aiza",
    "scores": [
      {
        "_id": "5387a3abd04551dc12e67cd6",
        "version": "1.0",
        "y": 71,
        "x": 82,
        "created": "2014-05-29T21:16:27.895Z"
      },
      {
        "_id": "5387a3acd04551dc12e67cd7",
        "version": "1.0",
        "y": 11,
        "x": 9,
        "created": "2014-05-29T21:16:28.029Z"
      },
      {
        "_id": "5387a3acd04551dc12e67cd8",
        "version": "1.0",
        "y": 66,
        "x": 74,
        "created": "2014-05-29T21:16:28.159Z"
      }
    ]
  },
  {
    "_id": "5387a3acd04551dc12e67cd9",
    "username": "finesse",
    "scores": [
      {
        "_id": "5387a3acd04551dc12e67cda",
        "version": "1.0",
        "y": 64,
        "x": 98,
        "created": "2014-05-29T21:16:28.409Z"
      },
      {
        "_id": "5387a3acd04551dc12e67cdb",
        "version": "1.0",
        "y": 77,
        "x": 64,
        "created": "2014-05-29T21:16:28.543Z"
      },
      {
        "_id": "5387a3acd04551dc12e67cdc",
        "version": "1.0",
        "y": 64,
        "x": 76,
        "created": "2014-05-29T21:16:28.673Z"
      }
    ]
  },
  {
    "_id": "5387a3acd04551dc12e67cdd",
    "username": "brennah",
    "scores": [
      {
        "_id": "5387a3acd04551dc12e67cde",
        "version": "1.0",
        "y": 24,
        "x": 10,
        "created": "2014-05-29T21:16:28.932Z"
      },
      {
        "_id": "5387a3add04551dc12e67cdf",
        "version": "1.0",
        "y": 32,
        "x": 6,
        "created": "2014-05-29T21:16:29.064Z"
      },
      {
        "_id": "5387a3add04551dc12e67ce0",
        "version": "1.0",
        "y": 54,
        "x": 77,
        "created": "2014-05-29T21:16:29.194Z"
      }
    ]
  },
  {
    "_id": "5387a3add04551dc12e67ce1",
    "username": "jazalynn",
    "scores": [
      {
        "_id": "5387a3add04551dc12e67ce2",
        "version": "1.0",
        "y": 62,
        "x": 67,
        "created": "2014-05-29T21:16:29.467Z"
      },
      {
        "_id": "5387a3add04551dc12e67ce3",
        "version": "1.0",
        "y": 83,
        "x": 80,
        "created": "2014-05-29T21:16:29.598Z"
      },
      {
        "_id": "5387a3add04551dc12e67ce4",
        "version": "1.0",
        "y": 79,
        "x": 83,
        "created": "2014-05-29T21:16:29.729Z"
      }
    ]
  },
  {
    "_id": "5387a3add04551dc12e67ce5",
    "username": "saleen",
    "scores": [
      {
        "_id": "5387a3add04551dc12e67ce6",
        "version": "1.0",
        "y": 62,
        "x": 99,
        "created": "2014-05-29T21:16:29.992Z"
      },
      {
        "_id": "5387a3aed04551dc12e67ce7",
        "version": "1.0",
        "y": 30,
        "x": 6,
        "created": "2014-05-29T21:16:30.118Z"
      },
      {
        "_id": "5387a3aed04551dc12e67ce8",
        "version": "1.0",
        "y": 24,
        "x": 10,
        "created": "2014-05-29T21:16:30.257Z"
      }
    ]
  },
  {
    "_id": "5387a3aed04551dc12e67ce9",
    "username": "azaira",
    "scores": [
      {
        "_id": "5387a3aed04551dc12e67cea",
        "version": "1.0",
        "y": 30,
        "x": 11,
        "created": "2014-05-29T21:16:30.512Z"
      },
      {
        "_id": "5387a3aed04551dc12e67ceb",
        "version": "1.0",
        "y": 64,
        "x": 79,
        "created": "2014-05-29T21:16:30.678Z"
      },
      {
        "_id": "5387a3aed04551dc12e67cec",
        "version": "1.0",
        "y": 52,
        "x": 68,
        "created": "2014-05-29T21:16:30.852Z"
      }
    ]
  },
  {
    "_id": "5387a3aed04551dc12e67ced",
    "username": "casey",
    "scores": [
      {
        "_id": "5387a3afd04551dc12e67cee",
        "version": "1.0",
        "y": 16,
        "x": 0,
        "created": "2014-05-29T21:16:31.122Z"
      },
      {
        "_id": "5387a3afd04551dc12e67cef",
        "version": "1.0",
        "y": 22,
        "x": 8,
        "created": "2014-05-29T21:16:31.254Z"
      },
      {
        "_id": "5387a3afd04551dc12e67cf0",
        "version": "1.0",
        "y": 73,
        "x": 79,
        "created": "2014-05-29T21:16:31.387Z"
      }
    ]
  },
  {
    "_id": "5387a3afd04551dc12e67cf1",
    "username": "nadalie",
    "scores": [
      {
        "_id": "5387a3afd04551dc12e67cf2",
        "version": "1.0",
        "y": 15,
        "x": 9,
        "created": "2014-05-29T21:16:31.655Z"
      },
      {
        "_id": "5387a3afd04551dc12e67cf3",
        "version": "1.0",
        "y": 30,
        "x": 10,
        "created": "2014-05-29T21:16:31.785Z"
      },
      {
        "_id": "5387a3afd04551dc12e67cf4",
        "version": "1.0",
        "y": 56,
        "x": 88,
        "created": "2014-05-29T21:16:31.915Z"
      }
    ]
  },
  {
    "_id": "5387a3b0d04551dc12e67cf5",
    "username": "jouri",
    "scores": [
      {
        "_id": "5387a3b0d04551dc12e67cf6",
        "version": "1.0",
        "y": 64,
        "x": 68,
        "created": "2014-05-29T21:16:32.181Z"
      },
      {
        "_id": "5387a3b0d04551dc12e67cf7",
        "version": "1.0",
        "y": 18,
        "x": 12,
        "created": "2014-05-29T21:16:32.322Z"
      },
      {
        "_id": "5387a3b0d04551dc12e67cf8",
        "version": "1.0",
        "y": 7,
        "x": 21,
        "created": "2014-05-29T21:16:32.456Z"
      }
    ]
  },
  {
    "_id": "5387a3b0d04551dc12e67cf9",
    "username": "stanley",
    "scores": [
      {
        "_id": "5387a3b0d04551dc12e67cfa",
        "version": "1.0",
        "y": 64,
        "x": 75,
        "created": "2014-05-29T21:16:32.727Z"
      },
      {
        "_id": "5387a3b0d04551dc12e67cfb",
        "version": "1.0",
        "y": 69,
        "x": 92,
        "created": "2014-05-29T21:16:32.859Z"
      },
      {
        "_id": "5387a3b0d04551dc12e67cfc",
        "version": "1.0",
        "y": 83,
        "x": 80,
        "created": "2014-05-29T21:16:32.988Z"
      }
    ]
  },
  {
    "_id": "5387a3b1d04551dc12e67cfd",
    "username": "rebekkah",
    "scores": [
      {
        "_id": "5387a3b1d04551dc12e67cfe",
        "version": "1.0",
        "y": 56,
        "x": 56,
        "created": "2014-05-29T21:16:33.252Z"
      },
      {
        "_id": "5387a3b1d04551dc12e67cff",
        "version": "1.0",
        "y": 84,
        "x": 95,
        "created": "2014-05-29T21:16:33.384Z"
      },
      {
        "_id": "5387a3b1d04551dc12e67d00",
        "version": "1.0",
        "y": 67,
        "x": 67,
        "created": "2014-05-29T21:16:33.515Z"
      }
    ]
  },
  {
    "_id": "5387a3b1d04551dc12e67d01",
    "username": "bosco",
    "scores": [
      {
        "_id": "5387a3b1d04551dc12e67d02",
        "version": "1.0",
        "y": 15,
        "x": 18,
        "created": "2014-05-29T21:16:33.785Z"
      },
      {
        "_id": "5387a3b1d04551dc12e67d03",
        "version": "1.0",
        "y": 50,
        "x": 66,
        "created": "2014-05-29T21:16:33.916Z"
      },
      {
        "_id": "5387a3b2d04551dc12e67d04",
        "version": "1.0",
        "y": 24,
        "x": 11,
        "created": "2014-05-29T21:16:34.048Z"
      }
    ]
  },
  {
    "_id": "5387a3b2d04551dc12e67d05",
    "username": "mannan",
    "scores": [
      {
        "_id": "5387a3b2d04551dc12e67d06",
        "version": "1.0",
        "y": 73,
        "x": 76,
        "created": "2014-05-29T21:16:34.306Z"
      },
      {
        "_id": "5387a3b2d04551dc12e67d07",
        "version": "1.0",
        "y": 43,
        "x": 54,
        "created": "2014-05-29T21:16:34.436Z"
      },
      {
        "_id": "5387a3b2d04551dc12e67d08",
        "version": "1.0",
        "y": 24,
        "x": 10,
        "created": "2014-05-29T21:16:34.569Z"
      }
    ]
  },
  {
    "_id": "5387a3b2d04551dc12e67d09",
    "username": "hollyn",
    "scores": [
      {
        "_id": "5387a3b2d04551dc12e67d0a",
        "version": "1.0",
        "y": 88,
        "x": 89,
        "created": "2014-05-29T21:16:34.838Z"
      },
      {
        "_id": "5387a3b2d04551dc12e67d0b",
        "version": "1.0",
        "y": 47,
        "x": 49,
        "created": "2014-05-29T21:16:34.974Z"
      },
      {
        "_id": "5387a3b3d04551dc12e67d0c",
        "version": "1.0",
        "y": 16,
        "x": 5,
        "created": "2014-05-29T21:16:35.108Z"
      }
    ]
  },
  {
    "_id": "5387a3b3d04551dc12e67d0d",
    "username": "lillyona",
    "scores": [
      {
        "_id": "5387a3b3d04551dc12e67d0e",
        "version": "1.0",
        "y": 15,
        "x": 5,
        "created": "2014-05-29T21:16:35.373Z"
      },
      {
        "_id": "5387a3b3d04551dc12e67d0f",
        "version": "1.0",
        "y": 56,
        "x": 83,
        "created": "2014-05-29T21:16:35.507Z"
      },
      {
        "_id": "5387a3b3d04551dc12e67d10",
        "version": "1.0",
        "y": 75,
        "x": 75,
        "created": "2014-05-29T21:16:35.638Z"
      }
    ]
  },
  {
    "_id": "5387a3b3d04551dc12e67d11",
    "username": "malichi",
    "scores": [
      {
        "_id": "5387a3b3d04551dc12e67d12",
        "version": "1.0",
        "y": 52,
        "x": 56,
        "created": "2014-05-29T21:16:35.898Z"
      },
      {
        "_id": "5387a3b4d04551dc12e67d13",
        "version": "1.0",
        "y": 73,
        "x": 76,
        "created": "2014-05-29T21:16:36.030Z"
      },
      {
        "_id": "5387a3b4d04551dc12e67d14",
        "version": "1.0",
        "y": 56,
        "x": 56,
        "created": "2014-05-29T21:16:36.158Z"
      }
    ]
  },
  {
    "_id": "5387a3b4d04551dc12e67d15",
    "username": "casidy",
    "scores": [
      {
        "_id": "5387a3b4d04551dc12e67d16",
        "version": "1.0",
        "y": 15,
        "x": 8,
        "created": "2014-05-29T21:16:36.418Z"
      },
      {
        "_id": "5387a3b4d04551dc12e67d17",
        "version": "1.0",
        "y": 20,
        "x": 23,
        "created": "2014-05-29T21:16:36.547Z"
      },
      {
        "_id": "5387a3b4d04551dc12e67d18",
        "version": "1.0",
        "y": 88,
        "x": 89,
        "created": "2014-05-29T21:16:36.679Z"
      }
    ]
  },
  {
    "_id": "5387a3b4d04551dc12e67d19",
    "username": "issaiah",
    "scores": [
      {
        "_id": "5387a3b4d04551dc12e67d1a",
        "version": "1.0",
        "y": 32,
        "x": 18,
        "created": "2014-05-29T21:16:36.938Z"
      },
      {
        "_id": "5387a3b5d04551dc12e67d1b",
        "version": "1.0",
        "y": 58,
        "x": 78,
        "created": "2014-05-29T21:16:37.065Z"
      },
      {
        "_id": "5387a3b5d04551dc12e67d1c",
        "version": "1.0",
        "y": 86,
        "x": 94,
        "created": "2014-05-29T21:16:37.195Z"
      }
    ]
  },
  {
    "_id": "5387a3b5d04551dc12e67d1d",
    "username": "iesha",
    "scores": [
      {
        "_id": "5387a3b5d04551dc12e67d1e",
        "version": "1.0",
        "y": 66,
        "x": 73,
        "created": "2014-05-29T21:16:37.456Z"
      },
      {
        "_id": "5387a3b5d04551dc12e67d1f",
        "version": "1.0",
        "y": 94,
        "x": 86,
        "created": "2014-05-29T21:16:37.583Z"
      },
      {
        "_id": "5387a3b5d04551dc12e67d20",
        "version": "1.0",
        "y": 58,
        "x": 73,
        "created": "2014-05-29T21:16:37.715Z"
      }
    ]
  },
  {
    "_id": "5387a3b5d04551dc12e67d21",
    "username": "lillymae",
    "scores": [
      {
        "_id": "5387a3b5d04551dc12e67d22",
        "version": "1.0",
        "y": 79,
        "x": 78,
        "created": "2014-05-29T21:16:37.982Z"
      },
      {
        "_id": "5387a3b6d04551dc12e67d23",
        "version": "1.0",
        "y": 62,
        "x": 70,
        "created": "2014-05-29T21:16:38.109Z"
      },
      {
        "_id": "5387a3b6d04551dc12e67d24",
        "version": "1.0",
        "y": 18,
        "x": 5,
        "created": "2014-05-29T21:16:38.245Z"
      }
    ]
  },
  {
    "_id": "5387a3b6d04551dc12e67d25",
    "username": "taysean",
    "scores": [
      {
        "_id": "5387a3b6d04551dc12e67d26",
        "version": "1.0",
        "y": 20,
        "x": 4,
        "created": "2014-05-29T21:16:38.503Z"
      },
      {
        "_id": "5387a3b6d04551dc12e67d27",
        "version": "1.0",
        "y": 26,
        "x": 6,
        "created": "2014-05-29T21:16:38.631Z"
      },
      {
        "_id": "5387a3b6d04551dc12e67d28",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:16:38.766Z"
      }
    ]
  },
  {
    "_id": "5387a3b6d04551dc12e67d29",
    "username": "skarleth",
    "scores": [
      {
        "_id": "5387a3b7d04551dc12e67d2a",
        "version": "1.0",
        "y": 75,
        "x": 93,
        "created": "2014-05-29T21:16:39.032Z"
      },
      {
        "_id": "5387a3b7d04551dc12e67d2b",
        "version": "1.0",
        "y": 15,
        "x": 8,
        "created": "2014-05-29T21:16:39.162Z"
      },
      {
        "_id": "5387a3b7d04551dc12e67d2c",
        "version": "1.0",
        "y": 39,
        "x": 51,
        "created": "2014-05-29T21:16:39.292Z"
      }
    ]
  },
  {
    "_id": "5387a3b7d04551dc12e67d2d",
    "username": "donatello",
    "scores": [
      {
        "_id": "5387a3b7d04551dc12e67d2e",
        "version": "1.0",
        "y": 73,
        "x": 94,
        "created": "2014-05-29T21:16:39.547Z"
      },
      {
        "_id": "5387a3b7d04551dc12e67d2f",
        "version": "1.0",
        "y": 52,
        "x": 68,
        "created": "2014-05-29T21:16:39.673Z"
      },
      {
        "_id": "5387a3b7d04551dc12e67d30",
        "version": "1.0",
        "y": 60,
        "x": 89,
        "created": "2014-05-29T21:16:39.802Z"
      }
    ]
  },
  {
    "_id": "5387a3b7d04551dc12e67d31",
    "username": "iskander",
    "scores": [
      {
        "_id": "5387a3b8d04551dc12e67d32",
        "version": "1.0",
        "y": 16,
        "x": 5,
        "created": "2014-05-29T21:16:40.057Z"
      },
      {
        "_id": "5387a3b8d04551dc12e67d33",
        "version": "1.0",
        "y": 41,
        "x": 29,
        "created": "2014-05-29T21:16:40.183Z"
      },
      {
        "_id": "5387a3b8d04551dc12e67d34",
        "version": "1.0",
        "y": 77,
        "x": 87,
        "created": "2014-05-29T21:16:40.311Z"
      }
    ]
  },
  {
    "_id": "5387a3b8d04551dc12e67d35",
    "username": "madeleine",
    "scores": [
      {
        "_id": "5387a3b8d04551dc12e67d36",
        "version": "1.0",
        "y": 16,
        "x": 16,
        "created": "2014-05-29T21:16:40.570Z"
      },
      {
        "_id": "5387a3b8d04551dc12e67d37",
        "version": "1.0",
        "y": 30,
        "x": 10,
        "created": "2014-05-29T21:16:40.700Z"
      },
      {
        "_id": "5387a3b8d04551dc12e67d38",
        "version": "1.0",
        "y": 94,
        "x": 70,
        "created": "2014-05-29T21:16:40.831Z"
      }
    ]
  },
  {
    "_id": "5387a3b8d04551dc12e67d39",
    "username": "abbigayle",
    "scores": [
      {
        "_id": "5387a3b9d04551dc12e67d3a",
        "version": "1.0",
        "y": 58,
        "x": 49,
        "created": "2014-05-29T21:16:41.097Z"
      },
      {
        "_id": "5387a3b9d04551dc12e67d3b",
        "version": "1.0",
        "y": 32,
        "x": 6,
        "created": "2014-05-29T21:16:41.225Z"
      },
      {
        "_id": "5387a3b9d04551dc12e67d3c",
        "version": "1.0",
        "y": 18,
        "x": 22,
        "created": "2014-05-29T21:16:41.353Z"
      }
    ]
  },
  {
    "_id": "5387a3b9d04551dc12e67d3d",
    "username": "tobi",
    "scores": [
      {
        "_id": "5387a3b9d04551dc12e67d3e",
        "version": "1.0",
        "y": 62,
        "x": 65,
        "created": "2014-05-29T21:16:41.612Z"
      },
      {
        "_id": "5387a3b9d04551dc12e67d3f",
        "version": "1.0",
        "y": 60,
        "x": 90,
        "created": "2014-05-29T21:16:41.741Z"
      },
      {
        "_id": "5387a3b9d04551dc12e67d40",
        "version": "1.0",
        "y": 30,
        "x": 18,
        "created": "2014-05-29T21:16:41.871Z"
      }
    ]
  },
  {
    "_id": "5387a3bad04551dc12e67d41",
    "username": "kobina",
    "scores": [
      {
        "_id": "5387a3bad04551dc12e67d42",
        "version": "1.0",
        "y": 13,
        "x": 7,
        "created": "2014-05-29T21:16:42.135Z"
      },
      {
        "_id": "5387a3bad04551dc12e67d43",
        "version": "1.0",
        "y": 39,
        "x": 51,
        "created": "2014-05-29T21:16:42.264Z"
      },
      {
        "_id": "5387a3bad04551dc12e67d44",
        "version": "1.0",
        "y": 62,
        "x": 85,
        "created": "2014-05-29T21:16:42.409Z"
      }
    ]
  },
  {
    "_id": "5387a3bad04551dc12e67d45",
    "username": "torrion",
    "scores": [
      {
        "_id": "5387a3bad04551dc12e67d46",
        "version": "1.0",
        "y": 67,
        "x": 80,
        "created": "2014-05-29T21:16:42.665Z"
      },
      {
        "_id": "5387a3bad04551dc12e67d47",
        "version": "1.0",
        "y": 56,
        "x": 70,
        "created": "2014-05-29T21:16:42.794Z"
      },
      {
        "_id": "5387a3bad04551dc12e67d48",
        "version": "1.0",
        "y": 77,
        "x": 87,
        "created": "2014-05-29T21:16:42.926Z"
      }
    ]
  },
  {
    "_id": "5387a3bbd04551dc12e67d49",
    "username": "abyssinia",
    "scores": [
      {
        "_id": "5387a3bbd04551dc12e67d4a",
        "version": "1.0",
        "y": 77,
        "x": 91,
        "created": "2014-05-29T21:16:43.183Z"
      },
      {
        "_id": "5387a3bbd04551dc12e67d4b",
        "version": "1.0",
        "y": 66,
        "x": 90,
        "created": "2014-05-29T21:16:43.311Z"
      },
      {
        "_id": "5387a3bbd04551dc12e67d4c",
        "version": "1.0",
        "y": 84,
        "x": 88,
        "created": "2014-05-29T21:16:43.442Z"
      }
    ]
  },
  {
    "_id": "5387a3bbd04551dc12e67d4d",
    "username": "kieran",
    "scores": [
      {
        "_id": "5387a3bbd04551dc12e67d4e",
        "version": "1.0",
        "y": 35,
        "x": 19,
        "created": "2014-05-29T21:16:43.718Z"
      },
      {
        "_id": "5387a3bbd04551dc12e67d4f",
        "version": "1.0",
        "y": 39,
        "x": 51,
        "created": "2014-05-29T21:16:43.846Z"
      },
      {
        "_id": "5387a3bbd04551dc12e67d50",
        "version": "1.0",
        "y": 71,
        "x": 73,
        "created": "2014-05-29T21:16:43.979Z"
      }
    ]
  },
  {
    "_id": "5387a3bcd04551dc12e67d51",
    "username": "tim",
    "scores": [
      {
        "_id": "5387a3bcd04551dc12e67d52",
        "version": "1.0",
        "y": 16,
        "x": 0,
        "created": "2014-05-29T21:16:44.243Z"
      },
      {
        "_id": "5387a3bcd04551dc12e67d53",
        "version": "1.0",
        "y": 79,
        "x": 78,
        "created": "2014-05-29T21:16:44.370Z"
      },
      {
        "_id": "5387a3bcd04551dc12e67d54",
        "version": "1.0",
        "y": 84,
        "x": 95,
        "created": "2014-05-29T21:16:44.502Z"
      }
    ]
  },
  {
    "_id": "5387a3bcd04551dc12e67d55",
    "username": "krysta",
    "scores": [
      {
        "_id": "5387a3bcd04551dc12e67d56",
        "version": "1.0",
        "y": 86,
        "x": 94,
        "created": "2014-05-29T21:16:44.760Z"
      },
      {
        "_id": "5387a3bcd04551dc12e67d57",
        "version": "1.0",
        "y": 94,
        "x": 86,
        "created": "2014-05-29T21:16:44.890Z"
      },
      {
        "_id": "5387a3bdd04551dc12e67d58",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:16:45.060Z"
      }
    ]
  },
  {
    "_id": "5387a3bdd04551dc12e67d59",
    "username": "milee",
    "scores": [
      {
        "_id": "5387a3bdd04551dc12e67d5a",
        "version": "1.0",
        "y": 69,
        "x": 69,
        "created": "2014-05-29T21:16:45.315Z"
      },
      {
        "_id": "5387a3bdd04551dc12e67d5b",
        "version": "1.0",
        "y": 18,
        "x": 14,
        "created": "2014-05-29T21:16:45.444Z"
      },
      {
        "_id": "5387a3bdd04551dc12e67d5c",
        "version": "1.0",
        "y": 81,
        "x": 73,
        "created": "2014-05-29T21:16:45.580Z"
      }
    ]
  },
  {
    "_id": "5387a3bdd04551dc12e67d5d",
    "username": "avannah",
    "scores": [
      {
        "_id": "5387a3bdd04551dc12e67d5e",
        "version": "1.0",
        "y": 67,
        "x": 76,
        "created": "2014-05-29T21:16:45.842Z"
      },
      {
        "_id": "5387a3bdd04551dc12e67d5f",
        "version": "1.0",
        "y": 26,
        "x": 13,
        "created": "2014-05-29T21:16:45.971Z"
      },
      {
        "_id": "5387a3bed04551dc12e67d60",
        "version": "1.0",
        "y": 60,
        "x": 82,
        "created": "2014-05-29T21:16:46.101Z"
      }
    ]
  },
  {
    "_id": "5387a3bed04551dc12e67d61",
    "username": "oyinkansola",
    "scores": [
      {
        "_id": "5387a3bed04551dc12e67d62",
        "version": "1.0",
        "y": 3,
        "x": 7,
        "created": "2014-05-29T21:16:46.375Z"
      },
      {
        "_id": "5387a3bed04551dc12e67d63",
        "version": "1.0",
        "y": 64,
        "x": 98,
        "created": "2014-05-29T21:16:46.511Z"
      },
      {
        "_id": "5387a3bed04551dc12e67d64",
        "version": "1.0",
        "y": 41,
        "x": 22,
        "created": "2014-05-29T21:16:46.647Z"
      }
    ]
  },
  {
    "_id": "5387a3bed04551dc12e67d65",
    "username": "kanasia",
    "scores": [
      {
        "_id": "5387a3bed04551dc12e67d66",
        "version": "1.0",
        "y": 52,
        "x": 22,
        "created": "2014-05-29T21:16:46.923Z"
      },
      {
        "_id": "5387a3bfd04551dc12e67d67",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:16:47.058Z"
      },
      {
        "_id": "5387a3bfd04551dc12e67d68",
        "version": "1.0",
        "y": 3,
        "x": 7,
        "created": "2014-05-29T21:16:47.188Z"
      }
    ]
  },
  {
    "_id": "5387a3bfd04551dc12e67d69",
    "username": "motoki",
    "scores": [
      {
        "_id": "5387a3bfd04551dc12e67d6a",
        "version": "1.0",
        "y": 75,
        "x": 73,
        "created": "2014-05-29T21:16:47.464Z"
      },
      {
        "_id": "5387a3bfd04551dc12e67d6b",
        "version": "1.0",
        "y": 50,
        "x": 71,
        "created": "2014-05-29T21:16:47.591Z"
      },
      {
        "_id": "5387a3bfd04551dc12e67d6c",
        "version": "1.0",
        "y": 50,
        "x": 66,
        "created": "2014-05-29T21:16:47.727Z"
      }
    ]
  },
  {
    "_id": "5387a3bfd04551dc12e67d6d",
    "username": "imer",
    "scores": [
      {
        "_id": "5387a3bfd04551dc12e67d6e",
        "version": "1.0",
        "y": 84,
        "x": 72,
        "created": "2014-05-29T21:16:47.989Z"
      },
      {
        "_id": "5387a3c0d04551dc12e67d6f",
        "version": "1.0",
        "y": 81,
        "x": 95,
        "created": "2014-05-29T21:16:48.125Z"
      },
      {
        "_id": "5387a3c0d04551dc12e67d70",
        "version": "1.0",
        "y": 56,
        "x": 88,
        "created": "2014-05-29T21:16:48.255Z"
      }
    ]
  },
  {
    "_id": "5387a3c0d04551dc12e67d71",
    "username": "kanai",
    "scores": [
      {
        "_id": "5387a3c0d04551dc12e67d72",
        "version": "1.0",
        "y": 66,
        "x": 91,
        "created": "2014-05-29T21:16:48.518Z"
      },
      {
        "_id": "5387a3c0d04551dc12e67d73",
        "version": "1.0",
        "y": 58,
        "x": 49,
        "created": "2014-05-29T21:16:48.659Z"
      },
      {
        "_id": "5387a3c0d04551dc12e67d74",
        "version": "1.0",
        "y": 71,
        "x": 85,
        "created": "2014-05-29T21:16:48.797Z"
      }
    ]
  },
  {
    "_id": "5387a3c0d04551dc12e67d75",
    "username": "kenadee",
    "scores": [
      {
        "_id": "5387a3c1d04551dc12e67d76",
        "version": "1.0",
        "y": 81,
        "x": 73,
        "created": "2014-05-29T21:16:49.057Z"
      },
      {
        "_id": "5387a3c1d04551dc12e67d77",
        "version": "1.0",
        "y": 54,
        "x": 77,
        "created": "2014-05-29T21:16:49.185Z"
      },
      {
        "_id": "5387a3c1d04551dc12e67d78",
        "version": "1.0",
        "y": 16,
        "x": 16,
        "created": "2014-05-29T21:16:49.315Z"
      }
    ]
  },
  {
    "_id": "5387a3c1d04551dc12e67d79",
    "username": "cadrian",
    "scores": [
      {
        "_id": "5387a3c1d04551dc12e67d7a",
        "version": "1.0",
        "y": 32,
        "x": 18,
        "created": "2014-05-29T21:16:49.571Z"
      },
      {
        "_id": "5387a3c1d04551dc12e67d7b",
        "version": "1.0",
        "y": 56,
        "x": 56,
        "created": "2014-05-29T21:16:49.703Z"
      },
      {
        "_id": "5387a3c1d04551dc12e67d7c",
        "version": "1.0",
        "y": 71,
        "x": 82,
        "created": "2014-05-29T21:16:49.839Z"
      }
    ]
  },
  {
    "_id": "5387a3c1d04551dc12e67d7d",
    "username": "karthika",
    "scores": [
      {
        "_id": "5387a3c2d04551dc12e67d7e",
        "version": "1.0",
        "y": 92,
        "x": 80,
        "created": "2014-05-29T21:16:50.111Z"
      },
      {
        "_id": "5387a3c2d04551dc12e67d7f",
        "version": "1.0",
        "y": 79,
        "x": 78,
        "created": "2014-05-29T21:16:50.247Z"
      },
      {
        "_id": "5387a3c2d04551dc12e67d80",
        "version": "1.0",
        "y": 60,
        "x": 91,
        "created": "2014-05-29T21:16:50.383Z"
      }
    ]
  },
  {
    "_id": "5387a3c2d04551dc12e67d81",
    "username": "deidrick",
    "scores": [
      {
        "_id": "5387a3c2d04551dc12e67d82",
        "version": "1.0",
        "y": 77,
        "x": 64,
        "created": "2014-05-29T21:16:50.661Z"
      },
      {
        "_id": "5387a3c2d04551dc12e67d83",
        "version": "1.0",
        "y": 16,
        "x": 16,
        "created": "2014-05-29T21:16:50.797Z"
      },
      {
        "_id": "5387a3c2d04551dc12e67d84",
        "version": "1.0",
        "y": 71,
        "x": 73,
        "created": "2014-05-29T21:16:50.928Z"
      }
    ]
  },
  {
    "_id": "5387a3c3d04551dc12e67d85",
    "username": "honor",
    "scores": [
      {
        "_id": "5387a3c3d04551dc12e67d86",
        "version": "1.0",
        "y": 64,
        "x": 68,
        "created": "2014-05-29T21:16:51.195Z"
      },
      {
        "_id": "5387a3c3d04551dc12e67d87",
        "version": "1.0",
        "y": 9,
        "x": 4,
        "created": "2014-05-29T21:16:51.324Z"
      },
      {
        "_id": "5387a3c3d04551dc12e67d88",
        "version": "1.0",
        "y": 56,
        "x": 70,
        "created": "2014-05-29T21:16:51.458Z"
      }
    ]
  },
  {
    "_id": "5387a3c3d04551dc12e67d89",
    "username": "aloysius",
    "scores": [
      {
        "_id": "5387a3c3d04551dc12e67d8a",
        "version": "1.0",
        "y": 71,
        "x": 75,
        "created": "2014-05-29T21:16:51.719Z"
      },
      {
        "_id": "5387a3c3d04551dc12e67d8b",
        "version": "1.0",
        "y": 50,
        "x": 70,
        "created": "2014-05-29T21:16:51.847Z"
      },
      {
        "_id": "5387a3c3d04551dc12e67d8c",
        "version": "1.0",
        "y": 64,
        "x": 76,
        "created": "2014-05-29T21:16:51.980Z"
      }
    ]
  },
  {
    "_id": "5387a3c4d04551dc12e67d8d",
    "username": "henson",
    "scores": [
      {
        "_id": "5387a3c4d04551dc12e67d8e",
        "version": "1.0",
        "y": 20,
        "x": 5,
        "created": "2014-05-29T21:16:52.251Z"
      },
      {
        "_id": "5387a3c4d04551dc12e67d8f",
        "version": "1.0",
        "y": 56,
        "x": 82,
        "created": "2014-05-29T21:16:52.383Z"
      },
      {
        "_id": "5387a3c4d04551dc12e67d90",
        "version": "1.0",
        "y": 22,
        "x": 11,
        "created": "2014-05-29T21:16:52.515Z"
      }
    ]
  },
  {
    "_id": "5387a3c4d04551dc12e67d91",
    "username": "alonna",
    "scores": [
      {
        "_id": "5387a3c4d04551dc12e67d92",
        "version": "1.0",
        "y": 71,
        "x": 78,
        "created": "2014-05-29T21:16:52.775Z"
      },
      {
        "_id": "5387a3c4d04551dc12e67d93",
        "version": "1.0",
        "y": 62,
        "x": 99,
        "created": "2014-05-29T21:16:52.904Z"
      },
      {
        "_id": "5387a3c5d04551dc12e67d94",
        "version": "1.0",
        "y": 16,
        "x": 16,
        "created": "2014-05-29T21:16:53.040Z"
      }
    ]
  },
  {
    "_id": "5387a3c5d04551dc12e67d95",
    "username": "asra",
    "scores": [
      {
        "_id": "5387a3c5d04551dc12e67d96",
        "version": "1.0",
        "y": 39,
        "x": 63,
        "created": "2014-05-29T21:16:53.297Z"
      },
      {
        "_id": "5387a3c5d04551dc12e67d97",
        "version": "1.0",
        "y": 47,
        "x": 49,
        "created": "2014-05-29T21:16:53.425Z"
      },
      {
        "_id": "5387a3c5d04551dc12e67d98",
        "version": "1.0",
        "y": 37,
        "x": 6,
        "created": "2014-05-29T21:16:53.558Z"
      }
    ]
  },
  {
    "_id": "5387a3c5d04551dc12e67d99",
    "username": "eztli",
    "scores": [
      {
        "_id": "5387a3c5d04551dc12e67d9a",
        "version": "1.0",
        "y": 26,
        "x": 13,
        "created": "2014-05-29T21:16:53.821Z"
      },
      {
        "_id": "5387a3c5d04551dc12e67d9b",
        "version": "1.0",
        "y": 67,
        "x": 80,
        "created": "2014-05-29T21:16:53.948Z"
      },
      {
        "_id": "5387a3c6d04551dc12e67d9c",
        "version": "1.0",
        "y": 67,
        "x": 82,
        "created": "2014-05-29T21:16:54.077Z"
      }
    ]
  },
  {
    "_id": "5387a3c6d04551dc12e67d9d",
    "username": "jesenia",
    "scores": [
      {
        "_id": "5387a3c6d04551dc12e67d9e",
        "version": "1.0",
        "y": 66,
        "x": 91,
        "created": "2014-05-29T21:16:54.336Z"
      },
      {
        "_id": "5387a3c6d04551dc12e67d9f",
        "version": "1.0",
        "y": 64,
        "x": 84,
        "created": "2014-05-29T21:16:54.471Z"
      },
      {
        "_id": "5387a3c6d04551dc12e67da0",
        "version": "1.0",
        "y": 28,
        "x": 11,
        "created": "2014-05-29T21:16:54.600Z"
      }
    ]
  },
  {
    "_id": "5387a3c6d04551dc12e67da1",
    "username": "jeralynn",
    "scores": [
      {
        "_id": "5387a3c6d04551dc12e67da2",
        "version": "1.0",
        "y": 7,
        "x": 4,
        "created": "2014-05-29T21:16:54.866Z"
      },
      {
        "_id": "5387a3c6d04551dc12e67da3",
        "version": "1.0",
        "y": 67,
        "x": 80,
        "created": "2014-05-29T21:16:54.995Z"
      },
      {
        "_id": "5387a3c7d04551dc12e67da4",
        "version": "1.0",
        "y": 5,
        "x": 6,
        "created": "2014-05-29T21:16:55.128Z"
      }
    ]
  },
  {
    "_id": "5387a3c7d04551dc12e67da5",
    "username": "koa",
    "scores": [
      {
        "_id": "5387a3c7d04551dc12e67da6",
        "version": "1.0",
        "y": 71,
        "x": 78,
        "created": "2014-05-29T21:16:55.390Z"
      },
      {
        "_id": "5387a3c7d04551dc12e67da7",
        "version": "1.0",
        "y": 88,
        "x": 90,
        "created": "2014-05-29T21:16:55.528Z"
      },
      {
        "_id": "5387a3c7d04551dc12e67da8",
        "version": "1.0",
        "y": 77,
        "x": 82,
        "created": "2014-05-29T21:16:55.662Z"
      }
    ]
  },
  {
    "_id": "5387a3c7d04551dc12e67da9",
    "username": "karsin",
    "scores": [
      {
        "_id": "5387a3c7d04551dc12e67daa",
        "version": "1.0",
        "y": 16,
        "x": 16,
        "created": "2014-05-29T21:16:55.920Z"
      },
      {
        "_id": "5387a3c8d04551dc12e67dab",
        "version": "1.0",
        "y": 32,
        "x": 17,
        "created": "2014-05-29T21:16:56.054Z"
      },
      {
        "_id": "5387a3c8d04551dc12e67dac",
        "version": "1.0",
        "y": 60,
        "x": 72,
        "created": "2014-05-29T21:16:56.185Z"
      }
    ]
  },
  {
    "_id": "5387a3c8d04551dc12e67dad",
    "username": "heiley",
    "scores": [
      {
        "_id": "5387a3c8d04551dc12e67dae",
        "version": "1.0",
        "y": 18,
        "x": 5,
        "created": "2014-05-29T21:16:56.454Z"
      },
      {
        "_id": "5387a3c8d04551dc12e67daf",
        "version": "1.0",
        "y": 52,
        "x": 56,
        "created": "2014-05-29T21:16:56.591Z"
      },
      {
        "_id": "5387a3c8d04551dc12e67db0",
        "version": "1.0",
        "y": 37,
        "x": 6,
        "created": "2014-05-29T21:16:56.726Z"
      }
    ]
  },
  {
    "_id": "5387a3c8d04551dc12e67db1",
    "username": "haydn",
    "scores": [
      {
        "_id": "5387a3c9d04551dc12e67db2",
        "version": "1.0",
        "y": 73,
        "x": 94,
        "created": "2014-05-29T21:16:57.010Z"
      },
      {
        "_id": "5387a3c9d04551dc12e67db3",
        "version": "1.0",
        "y": 100,
        "x": 100,
        "created": "2014-05-29T21:16:57.148Z"
      },
      {
        "_id": "5387a3c9d04551dc12e67db4",
        "version": "1.0",
        "y": 39,
        "x": 63,
        "created": "2014-05-29T21:16:57.280Z"
      }
    ]
  },
  {
    "_id": "5387a3c9d04551dc12e67db5",
    "username": "kofi",
    "scores": [
      {
        "_id": "5387a3c9d04551dc12e67db6",
        "version": "1.0",
        "y": 11,
        "x": 14,
        "created": "2014-05-29T21:16:57.539Z"
      },
      {
        "_id": "5387a3c9d04551dc12e67db7",
        "version": "1.0",
        "y": 66,
        "x": 85,
        "created": "2014-05-29T21:16:57.670Z"
      },
      {
        "_id": "5387a3c9d04551dc12e67db8",
        "version": "1.0",
        "y": 79,
        "x": 85,
        "created": "2014-05-29T21:16:57.803Z"
      }
    ]
  },
  {
    "_id": "5387a3c9d04551dc12e67db9",
    "username": "ramone",
    "scores": [
      {
        "_id": "5387a3cad04551dc12e67dba",
        "version": "1.0",
        "y": 15,
        "x": 5,
        "created": "2014-05-29T21:16:58.060Z"
      },
      {
        "_id": "5387a3cad04551dc12e67dbb",
        "version": "1.0",
        "y": 58,
        "x": 78,
        "created": "2014-05-29T21:16:58.188Z"
      },
      {
        "_id": "5387a3cad04551dc12e67dbc",
        "version": "1.0",
        "y": 5,
        "x": 6,
        "created": "2014-05-29T21:16:58.323Z"
      }
    ]
  },
  {
    "_id": "5387a3cad04551dc12e67dbd",
    "username": "amariona",
    "scores": [
      {
        "_id": "5387a3cad04551dc12e67dbe",
        "version": "1.0",
        "y": 66,
        "x": 87,
        "created": "2014-05-29T21:16:58.580Z"
      },
      {
        "_id": "5387a3cad04551dc12e67dbf",
        "version": "1.0",
        "y": 71,
        "x": 71,
        "created": "2014-05-29T21:16:58.710Z"
      },
      {
        "_id": "5387a3cad04551dc12e67dc0",
        "version": "1.0",
        "y": 7,
        "x": 21,
        "created": "2014-05-29T21:16:58.842Z"
      }
    ]
  },
  {
    "_id": "5387a3cad04551dc12e67dc1",
    "username": "elvia",
    "scores": [
      {
        "_id": "5387a3cbd04551dc12e67dc2",
        "version": "1.0",
        "y": 64,
        "x": 81,
        "created": "2014-05-29T21:16:59.104Z"
      },
      {
        "_id": "5387a3cbd04551dc12e67dc3",
        "version": "1.0",
        "y": 94,
        "x": 86,
        "created": "2014-05-29T21:16:59.236Z"
      },
      {
        "_id": "5387a3cbd04551dc12e67dc4",
        "version": "1.0",
        "y": 62,
        "x": 72,
        "created": "2014-05-29T21:16:59.366Z"
      }
    ]
  },
  {
    "_id": "5387a3cbd04551dc12e67dc5",
    "username": "ngoc",
    "scores": [
      {
        "_id": "5387a3cbd04551dc12e67dc6",
        "version": "1.0",
        "y": 32,
        "x": 17,
        "created": "2014-05-29T21:16:59.628Z"
      },
      {
        "_id": "5387a3cbd04551dc12e67dc7",
        "version": "1.0",
        "y": 32,
        "x": 18,
        "created": "2014-05-29T21:16:59.761Z"
      },
      {
        "_id": "5387a3cbd04551dc12e67dc8",
        "version": "1.0",
        "y": 5,
        "x": 6,
        "created": "2014-05-29T21:16:59.890Z"
      }
    ]
  },
  {
    "_id": "5387a3ccd04551dc12e67dc9",
    "username": "kacee",
    "scores": [
      {
        "_id": "5387a3ccd04551dc12e67dca",
        "version": "1.0",
        "y": 37,
        "x": 6,
        "created": "2014-05-29T21:17:00.150Z"
      },
      {
        "_id": "5387a3ccd04551dc12e67dcb",
        "version": "1.0",
        "y": 35,
        "x": 4,
        "created": "2014-05-29T21:17:00.284Z"
      },
      {
        "_id": "5387a3ccd04551dc12e67dcc",
        "version": "1.0",
        "y": 32,
        "x": 14,
        "created": "2014-05-29T21:17:00.416Z"
      }
    ]
  },
  {
    "_id": "5387a3ccd04551dc12e67dcd",
    "username": "rutledge",
    "scores": [
      {
        "_id": "5387a3ccd04551dc12e67dce",
        "version": "1.0",
        "y": 9,
        "x": 7,
        "created": "2014-05-29T21:17:00.683Z"
      },
      {
        "_id": "5387a3ccd04551dc12e67dcf",
        "version": "1.0",
        "y": 58,
        "x": 83,
        "created": "2014-05-29T21:17:00.814Z"
      },
      {
        "_id": "5387a3ccd04551dc12e67dd0",
        "version": "1.0",
        "y": 69,
        "x": 63,
        "created": "2014-05-29T21:17:00.947Z"
      }
    ]
  },
  {
    "_id": "5387a3cdd04551dc12e67dd1",
    "username": "kiylah",
    "scores": [
      {
        "_id": "5387a3cdd04551dc12e67dd2",
        "version": "1.0",
        "y": 73,
        "x": 94,
        "created": "2014-05-29T21:17:01.207Z"
      },
      {
        "_id": "5387a3cdd04551dc12e67dd3",
        "version": "1.0",
        "y": 66,
        "x": 74,
        "created": "2014-05-29T21:17:01.340Z"
      },
      {
        "_id": "5387a3cdd04551dc12e67dd4",
        "version": "1.0",
        "y": 60,
        "x": 82,
        "created": "2014-05-29T21:17:01.470Z"
      }
    ]
  },
  {
    "_id": "5387a3cdd04551dc12e67dd5",
    "username": "corin",
    "scores": [
      {
        "_id": "5387a3cdd04551dc12e67dd6",
        "version": "1.0",
        "y": 64,
        "x": 85,
        "created": "2014-05-29T21:17:01.745Z"
      },
      {
        "_id": "5387a3cdd04551dc12e67dd7",
        "version": "1.0",
        "y": 71,
        "x": 85,
        "created": "2014-05-29T21:17:01.875Z"
      },
      {
        "_id": "5387a3ced04551dc12e67dd8",
        "version": "1.0",
        "y": 30,
        "x": 10,
        "created": "2014-05-29T21:17:02.005Z"
      }
    ]
  },
  {
    "username": "ted",
    "_id": "5387b272445138dc1d18cd19",
    "scores": []
  },
  {
    "username": "ned",
    "_id": "5387b2faf732e06b1e4fffcb",
    "scores": []
  },
  {
    "_id": "5387f68ff732e06b1e4fffcc",
    "username": "andrew",
    "scores": [
      {
        "_id": "5387f744f732e06b1e4fffcd",
        "version": "1.0",
        "y": 75,
        "x": 50,
        "created": "2014-05-30T03:13:08.800Z"
      },
      {
        "_id": "5387ff0ef732e06b1e4fffce",
        "version": "1.0",
        "y": 65.5454,
        "x": 23.4554,
        "created": "2014-05-30T03:46:22.712Z"
      }
    ]
  }
]);
});


app.get('/', function(req, res) {
  res.render('index');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});