//	Methods for Project 1: Cella Rule 150

//	Rule 150 Configuration cells
var configs = { 
	"1, 1, 1": 1,
	"1, 1, 0": 0,
	"1, 0, 1": 0,
	"1, 0, 0": 1,
	"0, 1, 1": 0,
	"0, 1, 0": 1,
	"0, 0, 1": 1,
	"0, 0, 0": 0
};

//	Initial setup process
//	Generates first generation
function setup( ctx, cells ) {
	cells[0][199] = 1;
	ctx.fillStyle = "white";
	ctx.scale(4, 4);
  	ctx.fillRect(0, 0, canvas.width, canvas.height);
  	draw_grid( ctx, 1, 50, 'black', 'blue' );
  	draw_rect( ctx, "black", 0, 199);
}

//	Populates cells by finding next generation cells
function populateCells( ctx, cells, curr_row ) {
	//	Display population of the grid every 50 milliseconds
	var gridAnimation = setInterval(function() {
		for(var curr_col = 0; curr_col<399; curr_col++) {
			var subcells = [];
			
			//	Handle corner cases as empty when no cell is available
			if ( curr_col === 0 ) {
				subcells.push(0);
				subcells.push(cells[curr_row][curr_col]);
				subcells.push(cells[curr_row][curr_col+1]);
			} else if ( curr_col === 399 ) {
				subcells.push(cells[curr_row][curr_col-1]);
				subcells.push(cells[curr_row][curr_col]);
				subcells.push(0)
			} else {
				subcells.push(cells[curr_row][curr_col-1]);
				subcells.push(cells[curr_row][curr_col]);
				subcells.push(cells[curr_row][curr_col+1])
			}

			//	Get next generation value
			var nextGenValue = getNextGenValue(subcells);
		
			// Draw in the square
			if(nextGenValue === 1) {
				draw_rect(ctx, "black", curr_row + 1, curr_col);
			}

			// Update cells
			cells[curr_row+1][curr_col] = nextGenValue;
		}

		//	End interval animation before reaching the last nine rows
		if(curr_row === 390) {
			clearInterval(gridAnimation);
		}
	}, 50);
}

function getNextGenValue( subcells ) {
	for(var key in configs) {
		if(key === subcells.join(", ")) {
			return configs[key];
		}
	}
}

// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.
//function draw_rect( ctx, stroke, fill ) 
function draw_rect( ctx, fill, row, col ) 
{
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.fillStyle = fill;
    ctx.rect(col, row, 1, 1);
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}
