function chr(num:number):string {
	return String.fromCharCode(num);
}

function alphaMap (num:number):string {
	var $alph = '', $num = num;
	while($num >= 0) {
		$alph = chr($num % 26 + 0x41) + $alph;
		$num = ($num/26) - 1;
		
	}
	return $alph;
}

export = alphaMap;