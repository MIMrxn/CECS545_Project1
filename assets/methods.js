//	Methods for Project 1: Cella Rule 150

//	Rule 150 Configuration cells
let configs = [
	{ config: [1, 1, 1], next: 1 },
	{ config: [1, 1, 0], next: 0 },
	{ config: [1, 0, 1], next: 0 },
	{ config: [1, 0, 0], next: 1 },
	{ config: [0, 1, 1], next: 0 },
	{ config: [0, 1, 0], next: 1 },
	{ config: [0, 0, 1], next: 1 },
	{ config: [0, 0, 0], next: 0 },
];

//	Initial setup process
//	Generates first generation
function setup( ctx, cells ) {
	cells[0][199] = 1;
	ctx.fillStyle = "white";
	ctx.scale(4, 4);
  	ctx.fillRect(0, 0, canvas.width, canvas.height);
  	draw_grid( ctx, 1, 50, 'black', 'blue' );
  	draw_rect( ctx, "red", "black");
}

//	Populates cells by finding next generation cells
function populateCells( ctx, cells, curr_row ) {
	var curr_row = 0;
	
	//	Split current generation row into subcells of size 3
	//	Currently testing so using some function instead of forEach
	//	forEach will be used in final version
	cells.some(function(row) {
		document.write("".concat(curr_row + ": " + row));

		var curr_col = 0;
		row.some(function(col) {
			var splitRow = [];
			if ( curr_col === 0 ) {
				splitRow.push(0);
				splitRow.push(row[curr_col]);
				splitRow.push(row[curr_col+1]);
			} else if ( curr_col === 399 ) {
				splitRow.push(row[curr_col-1]);
				splitRow.push(row[curr_col]);
				splitRow.push(0)
			} else {
				splitRow.push(row[curr_col-1]);
				splitRow.push(row[curr_col]);
				splitRow.push(row[curr_col+1])
			}
			document.write(curr_col + ": " + splitRow + "\n");
			curr_col++;
			return curr_col === 201;
		});
		
		curr_row++;
		return curr_row === 1;
	});
}

// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------

// FUN. Draw filled rect.
function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    //ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    //ctx.lineWidth = 5;
    //ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.rect(199, 0, 1, 1);
    //ctx.stroke();
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