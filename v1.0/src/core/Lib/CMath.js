qPack("Math/CMath.js", function( target = window ){

	function CMath(){

	};

	//-------------------------------- INCLUDES(0) ----

	/*

		MTH:

		Color:

		- New

		- Add

		- Subtract

		- Scale

		- AdjustHue

		- AdjustContrast

		Vector2:

		- Add

		- Sub

		- Mult

		- Scale

		- Div

		Vector3:

		Vector4:

		Quaternion:

		- New

		- Zero

		- Add

		- Subtract

		- Multtiply

		- Transform

		- qDot

		- qCross

		- Rotate

		- Conjugate

		Matrix:

		- New

		- Zero

		- Add

		- Sub

		- Mult

		- MultQ

		- MultTranspose

		- Scale

		- Compose

		- Decompose

		- Determinant

		- Inverse

		- Trace

		- Transpose

		- RotationX

		- RotationY

		- RotationZ

		- RotationAxis

		- RotationQ

		- Translate

		- Identity

		- IsIdentity

		- LookAtLH

		- LookAtRH

		- Reflect

		- AffineTransform

		- AffineTransform2D

		- OrthoLH

		- OrthoRH

		- OrthoOffCenterLH

		- OrthoOffCenterRH

		- PerspectiveFovLH

		- PerspectiveFovRH

		- PerspectiveLH

		- PerspectiveRH

		- Shadow

		- Scaling

		Plane:

		Frustrum:

		Viewport:

		Ray

	*/

	const N_RAD/*|Number*/ = 180 / Math.PI;

	const N_DEG/*|Number*/ = Math.PI / 180;

	
	function qRadToDeg( rads ){
		return Deg * rads;
	};
	function qDegToRad( deg ){
		return Rad * deg;
	};

	function qMax(args){

		return Math.max.call(this,args);

	}

	function qMin(args){

		return Math.min.call(this,args);

	}

	function qFloat(x){

		return parseFloat(x);

	}

	function qRound(x/*|Number*/, nearest/*|Number*/ = 10)/*|Number*/{

		return Math.round.call(this,x * nearest) / nearest;

	};

	function qRandf(min/*|Number*/, max/*|Number*/)/*|Number*/{

		return  min + Math.random() * (max - min);

	};

	function qRand(min/*|Number*/, max/*|Number*/)/*|int*/{

		return qRound( min + Math.random() * (max - min));

	};

	function qBound(x/*|Number*/, val/*|Number*/, min/*|Number*/ = 0, max/*|Number*/ = 1)/*|Number*/{

		return x < max && x > min ? (x * max) / val : max / x;

	};

	function qPercent(x/*|Number*/, n/*|Number*/, a/*|Number*/ = 0, term/*|Number*/ = 100)/*|Number*/{

		var res/*|Number*/ = 0;

		res = a === 0 ? (x / term * n) : n === 0 ? ((a * term) / x) : (a * term) / n;

		return res;

	};

	function qSolve(unknown/*|Number*/, expresion1/*|String*/, expresion2/*|String*/ = "") {

		// x^2=a^2+(4a-b/2); a:2,b:5,x:?

		// a+2b-4 = 3b - a; a:?;

		//qsolve( "a+4=5-2a","a");

		// MTH = {geo, calc, alg, diff, prob, stat, disc, int, lim, der, pder}

		//qsolve.geo( "area", rec, {area:41,L:12,W:null} );

		//qsolve.alg( {exp:"2x^2+7-b=4;3x+12+b^2=17;",x:null,b:4}

		//qsolve(unknow,expression)

		// qTan qSin qCos qAcos qAtan qAsin

	};

	function qAbs(x/*|Number*/)/*|Number*/{

		return x < 0 ? -x : x;

	};

	function qCube(x/*|Number*/)/*|Number*/{

		return x * x * x;

	};

	function qRoot( n/*|Number*/,x/*|Number*/ )/*|Number*/{

		return Math.pow( x,1/n);

	}

	/*

	--------------------------------

	TRIGONOMETRIC FUNCTIONS

	--------------------------------

	*/

	const PI/*|Number*/ = 3.14159265358979;

	function qSin(x/*|Number*/)/*|Number*/{

		return Math.sin(x);

	};

	function qCos(x/*|Number*/)/*|Number*/{

		return Math.cos(x);

	};

	function qTan(x/*|Number*/)/*|Number*/{

		return Math.tan(x);

	};

	function qCot(x/*|Number*/)/*|Number*/{

		return 1 / qTan(x);

	};

	function qCotD(x/*|Number*/)/*|Number*/{

		return 1 / qTan(x *N_DEG);

	};

	function qAsin(x/*|Number*/)/*|Number*/{

		return Math.asin(x);

	};

	function qAcos(x/*|Number*/)/*|Number*/{

		return Math.acos(x);

	};

	function qAtan(x/*|Number*/)/*|Number*/{

		return Math.atan(x);

	};

	function qAtan2(y/*|Number*/, x/*|Number*/)/*|Number*/{

		return Math.atan2(y, y);

	};

	function qSinD(x/*|Number*/)/*|Number*/{

		return qSin(x *N_DEG);

	};

	function qCosD(x/*|Number*/)/*|Number*/{

		return qCos(x *N_DEG);

	};

	function qTanD(x/*|Number*/)/*|Number*/{

		return qTan(x *N_DEG);

	};

	function qAsinD(x/*|Number*/)/*|Number*/{

		return Math.asin(x *N_RAD);

	};

	function qAcosD(x/*|Number*/)/*|Number*/{

		return Math.acos(x *N_RAD);

	};

	function qAtanD(x/*|Number*/)/*|Number*/{

		return Math.atan(x *N_RAD);

	};

	function qAtan2D(y/*|Number*/, x/*|Number*/)/*|Number*/{

		return Math.atan2(y, x) *N_RAD;

	};

	// MISC

	function qSqrt(x/*|Number*/)/*|Number*/{

		return Math.sqrt(x);

	};

	function qPower( x/*|Number*/,y/*|Number*/ )/*|Number*/{

		return Math.pow(x,y);

	};

	function qFactorial( n/*|Number*/ )/*|Number*/{

		if(n == 0 || n == 1 ) return 1;

		return  n*qFactorial(n-1);

	};

	function qBinomial( n/*|Number*/, k/*|Number*/ )/*|Array*/

	{

		var b/*|Array*/= [1];

		for( var i/*|int*/=1;i<=k; ++i ){

			b[i] = qFactorial(n)/( qFactorial(k) * qFactorial(n-k) );

		}

		return b;

	};

	function qAverage(numbers/*|Array*/)/*|Number*/{

		var sum/*|Number*/ = 0;

		for (var i/*|int*/ = 0; i < numbers.length; i++) sum += numbers[i];

		return sum / numbers.length;

	};

	function qRSqrt(x/*|Number*/)/*|Number*/{

		var i/*|int*/, e21/*|Number*/, y/*|Number*/, threehalfs/*|Number*/ = 1.5;

		e21 = x * 0.5;

		y = x;

		i = int(y);

		i = 0x5f3759df - (i >> 1);

		y = qFloat(i);

		y = y * (threehalfs - (e21 * y * y));

		return y;

	};

	function qFixAngle(angle/*|Number*/)/*|Number*/{

		angle %= 360;

		return angle < 0 ? angle + 360 : angle;

	};

	function qCartesianToPolar(u/*|FVec2*/)/*|Array*/{

		var theta/*|Number*/ =qAtan2D(u.Y(), u.X());

		var radius/*|Number*/ =qSqrt(u.X() * u.X() + u.Y() * u.Y());

		return [theta, radius];

	};

	function qPolarToCartesian(u/*|FVec2*/)/*|FVec2*/ {

		return u;

	};

	function qLog(base/*|Number*/, value/*|Number*/)/*|Number*/{

		return Math.log(base) / Math.log(value);

	};

	/*

	VECTOR

	------------------------------------------------------------------------------------

	*/

	function V2New(x/*|Number*/ = 0, y/*|Number*/ = 0)/*|CFloat2*/{

		return QB.CFloat2.New(x, y);

	};

	// V2AddIn(u,v)

	function V3New(x/*|Number*/ = 0, y/*|Number*/ = 0, z/*|Number*/ = 0)/*|CFloat3*/{

		return QB.CFloat3.New(x, y, z);

	};

	function V3Zero()/*|CFloat3*/{

		return V3New();

	};

	function VectorQ(u/*|Array*/)/*|Boolean*/ {

		if (u.length < 2) return false;

		for (var i/*|int*/ = 0; i < u.length; i++)

		if (!TypeOf(u[i],"Number")) return false;

		return true;

	};

	function Dimension(tensor/*|Array*/)/*|Array*/{

		if (VectorQ(tensor)) return [tensor.length];

		else if (MatrixQ(tensor)) return [tensor.length, tensor[0].length];

		return null;

	};

	function Add(u/*|Array*/, v/*|Array*/)/*|Array*/{

		var c/*|Array*/ = [];

		if (u.length != v.length) return null;

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] + v[i];

		return c;

	};

	function V2Add(u/*|CFloat2*/, v/*|CFloat2*/)/*|CFloat2*/{

		return V2New(u.X() + v.X(), u.Y() + v.Y());

	};

	function V2AddIn(u/*|CFloat2*/, v/*|CFloat2*/)/*|void*/{

		u.X() += v.X();

		u.Y() += v.Y();

	};

	function VAddN(u/*|Array*/, scalar/*|Number*/)/*|Array*/{

		var c/*|Array*/ = [];

		if (u.length < 2) return null;

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] + scalar;

		return c;

	};

	function VSubN(u/*|Array*/, scalar/*|Number*/)/*|Array*/{

		var c/*|Array*/ = [];

		if (u.length < 2) return null;

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] - scalar;

		return c;

	};

	function VSub(u/*|Array*/, v/*|Array*/)/*|Array*/{

		var c/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] - v[i];

		return c;

	};

	function V2Sub( u/*|CFloat2*/, v/*|CFloat2*/,result/*|CFloat2*/)/*|void*/{

		result.Reset(u.X() - v.X(), u.Y() - v.Y());

	};

	function V3Sub( u/*|CFloat3*/, v/*|CFloat3*/,result/*|CFloat3*/)/*|void*/{

		result.Reset(u.X() - v.X(), u.Y() - v.Y(), u.Z() - v.Z());

	};

	function V4Sub( u/*|CFloat4*/, v/*|CFloat4*/,result/*|CFloat4*/)/*|void*/{

		result.Reset(u.X() - v.X(), u.Y() - v.Y(), u.Z() - v.Z(), u.W() - v.W());

	};

	function VScale(u/*|Array*/, scalar/*|Number*/)/*|Array*/{

		var v/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < u.length; i++) v[i] = u[i] * scalar;

		return v;

	};

	function V2Scale(v/*|CFloat2*/, k/*|Number*/, out/*|CFloat2*/)/*|void*/{

		out.X() = v.X() * k;

		out.Y() = v.Y() * k;

	};

	function VDivide(u/*|Array*/, scalar/*|Number*/)/*|Array*/{

		var v/*|Array*/ = [];

		if (u.length < 2) return null;

		for (var i/*|int*/ = 0; i < u.length; i++) v[i] = u[i] / scalar;

		return v;

	};

	function qCross(u/*|Array*/, v/*|Array*/)/*|Array*/{

		var c/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] - v[i];

		return c;

	};

	function V3Cross( result/*|CFloat3*/, u/*|CFloat3*/, v/*|CFloat3*/)/*|void*/{

		result.Set( V3(qCross(A3(u), A3(v))));

	};

	function V4Cross(result/*|CFloat4*/, u/*|CFloat4*/, v/*|CFloat4*/)/*|void*/{

		result.Set( V4(qCross(A4(u), A4(v))));

	};

	function QCross( result/*|CFloat4*/, u/*|CFloat4*/, v/*|CFloat4*/)/*|void*/{

		result.Set( V4(qCross(A4(u), A4(v))));

	};

	function qDot(u/*|Array*/, v/*|Array*/)/*|Number*/{

		var res/*|Number*/ = 0;

		for (var i/*|int*/ = 0; i < u.length; i++) res += u[i] * v[i];

		return res;

	};

	function V2Dot(u/*|CFloat2*/, v/*|CFloat2*/)/*|Number*/{

		return qDot(A2(u), A2(v));

	};

	function V3Dot(u/*|CFloat3*/, v/*|CFloat3*/)/*|Number*/{

		return qDot(A3(u), A3(v));

	};

	function V4Dot(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qDot(A4(u), A4(v));

	};

	function QDot(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qDot(A4(u), A4(v));

	};

	function qDistance(u/*|Array*/, v/*|Array*/)/*|Number*/{

		var res/*|Number*/ = 0;

		for (var i/*|int*/ = 0; i < u.length; i++) res += (u[i] - v[i]) * (u[i] - v[i]);

		return qSqrt(res);

	};

	function V2Distance(u/*|CFloat2*/, v/*|CFloat2*/)/*|Number*/{

		return qDistance(A2(u), A2(v));

	};

	function V3Distance(u/*|CFloat3*/, v/*|CFloat3*/)/*|Number*/{

		return qDistance(A3(u), A3(v));

	};

	function V4Distance(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qDistance(A4(u), A4(v));

	};

	function QDistance(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qDistance(A4(u), A4(v));

	};

	function qCenter(u/*|Array*/, v/*|Array*/)/*|Array*/{

		var w/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < u.length; i++) w[i] = (u[i] + v[i]) / 2;

		return w;

	};

	function V2Center(u/*|CFloat2*/, v/*|CFloat2*/)/*|CFloat2*/{

		return V2(qCenter(A2(u), A2(v)));

	};

	function V3Center(u/*|CFloat3*/, v/*|CFloat3*/)/*|CFloat3*/{

		return V3(qCenter(A3(u), A3(v)));

	};

	function V4Center(u/*|CFloat4*/, v/*|CFloat4*/)/*|CFloat4*/{

		return V4(qCenter(A4(u), A4(v)));

	};

	function QCenter(u/*|CFloat4*/, v/*|CFloat4*/)/*|CFloat4*/{

		return V4(qCenter(A4(u), A4(v)));

	};

	function qMag(u/*|Array*/)/*|Number*/{

		var sum/*|Number*/ = 0;

		for (var i/*|int*/ = 0; i < u.length; i++) sum += u[i] * u[i];

		return qSqrt(sum);

	};

	function V2Mag(u/*|CFloat2*/)/*|Number*/{

		return qMag(A2(u));

	};

	function V3Mag(u/*|CFloat3*/)/*|Number*/{

		return qMag(A3(u));

	};

	function V4Mag(u/*|CFloat4*/)/*|Number*/{

		return qMag(A4(u));

	};

	function QMag(u/*|CFloat4*/)/*|Number*/{

		return qMag(A4(u));

	};

	function Direction(u/*|Array*/)/*|Number*/{

		return qAtan(u[1] / u[0]) * Rad;

	};

	function VNormalize(u/*|Array*/)/*|Array*/{

		var c/*|Array*/ = [];

		var mag/*|Number*/ = qMag(u);

		if (mag == 1) return c = u;

		else

		for (var i/*|int*/ = 0; i < u.length; i++) c[i] = u[i] / mag;

		return c;

	};

	function V2Normalize(u/*|CFloat2*/)/*|void*/{

		u.Set(V2(VNormalize(A2(u))));

	};

	function V3Normalize(u/*|CFloat3*/)/*|void*/{

		u.Set(V3(VNormalize(A3(u))));

	};

	function V4Normalize(u/*|CFloat4*/)/*|void*/{

		u.Set(V4(VNormalize(A4(u))));

	};

	function IsAUnit(u/*|Array*/)/*|Boolean*/ {

		return qMag(u) == 1;

	};

	function ScalarProjection(u/*|Array*/, v/*|Array*/)/*|Number*/{

		return qDot(u, v) / qMag(v);

	};

	function VProjection(u/*|Array*/, v/*|Array*/)/*|Array*/{

		return VScale(v, qDot(u, v) / (qMag(v) * qMag(v)));

	};

	function VRejection(u/*|Array*/, v/*|Array*/)/*|Array*/{

		return VSub(u, VProjection(u, v));

	};

	function qAngle(u/*|Array*/, v/*|Array*/)/*|Number*/{

		var d/*|Number*/ = qDot(u, v);

		var m/*|Number*/ = qMag(u) * qMag(v);

		return qAcos(d / m) * Rad;

	};

	function V2Angle(u/*|CFloat2*/, v/*|CFloat2*/)/*|Number*/{

		return qAngle(A2(u), A2(v));

	};

	function V3Angle(u/*|CFloat3*/, v/*|CFloat3*/)/*|Number*/{

		return qAngle(A3(u), A3(v));

	};

	function V4Angle(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qAngle(A4(u), A4(v));

	};

	function QAngle(u/*|CFloat4*/, v/*|CFloat4*/)/*|Number*/{

		return qAngle(A4(u), A4(v));

	};

	function VPerpendicularQ(u/*|Array*/, v/*|Array*/)/*|Boolean*/ {

		return qDot(u, v) == 0;

	};

	function VParallelQ(u/*|Array*/, v/*|Array*/)/*|Boolean*/ {

		if (!(u.length >= 2 && v.length == u.length)) return false;

		/////////////////////////////////////////////////////////////

		return u == v;

	};

	function VInverse(u/*|Array*/)/*|Array*/{

		var v/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < u.length; i++) v[i] = -u[i];

		return v;

	};

	function V2Inverse(u/*|CFloat2*/)/*|CFloat2*/{

		return V2New(-u.X(), -u.Y());

	};

	function V3Inverse(u/*|CFloat3*/)/*|CFloat3*/{

		return V3New(-u.X(), -u.Y(), -u.Z());

	};

	function V4Inverse(u/*|CFloat4*/)/*|CFloat4*/{

		return V4New(-u.X(), -u.Y(), -u.Z(), -u.W());

	};

	function QInverse(u/*|CFloat4*/)/*|CFloat4*/{

		return QNew(-u.X(), -u.Y(), -u.Z(), -u.W());

	};

	function qDirectionAngle(u/*|Array*/, axis/*|uint*/ = 0)/*|Number*/{

		var theta/*|Number*/ = 0;

		switch (u.length) {

			case 2:

			theta = qAcos(u[1] / u[1]) * Rad;

			default:

			{

				var c/*|Array*/ = [],

				mag/*|Number*/ = qMag(u);

				for (var i/*|int*/ = 0; i < u.length; i++) {

					theta += ((u[i] / mag) * (u[i] / mag));

				}

			}

		}

		return theta;

	};

	function VNorm(t/*|Array*/, p/*|int*/ = 1)/*|Number*/{

		if (p == 0) return Math.max.apply(null, t);

		if (p < 0) return Math.min.apply(null, t);

		return Math.pow(qMag(t), p);

	};

	function V2Norm(u/*|CFloat2*/, p/*|int*/ = 1)/*|Number*/{

		return VNorm(A2(u));

	};

	function V3Norm(u/*|CFloat3*/, p/*|int*/ = 1)/*|Number*/{

		return VNorm(A3(u));

	};

	function V4Norm(u/*|CFloat4*/, p/*|int*/ = 1)/*|Number*/{

		return VNorm(A4(u));

	};

	function QNorm(u/*|CFloat4*/, p/*|int*/ = 1)/*|Number*/{

		return VNorm(A4(u));

	};

	/*

	VECTOR3

	------------------------------------------------------------------------------------

	*/

	function V4New(x/*|Number*/ = 0.0, y/*|Number*/ = 0.0, z/*|Number*/ = 0.0, w/*|Number*/ = 0.0)/*|CFloat4*/{

		return QB.CFloat4.New(x, y, z, w);

	};

	function V3TransformCoords(  v/*|CFloat3*/, M/*|CFloat4x4*/,result/*|CFloat3*/)/*|void*/{

		var x/*|Number*/ = (v.X()*M.e11) + (v.Y()*M.e21) + (v.Z() * M.e31) + M.e41;

		var y/*|Number*/ = (v.X()*M.e12) + (v.Y()*M.e22) + (v.Z() * M.e32) + M.e42;

		var z/*|Number*/ = (v.X()*M.e13) + (v.Y()*M.e23) + (v.Z() * M.e33) + M.e43;

		var w/*|Number*/ = (v.X()*M.e14) + (v.Y()*M.e24) + (v.Z() * M.e34) + M.e44;

		result.Reset(x/w,y/w,z/w);

	};

	/*

	QUATERNION

	------------------------------------------------------------------------------------

	*/

	function QNew(x/*|Number*/ = 0.0, y/*|Number*/ = 0.0, z/*|Number*/ = 0.0, w/*|Number*/ = 0.0)/*|CFloat4*/{

		return CFloat4.New(x, y, z, w);

	};

	function QZero()/*|CFloat4*/{

		return QNew();

	};

	function QRotationYawPitchRoll(yaw/*|Number*/, pitch/*|Number*/, roll/*|Number*/)/*|CFloat4*/{

		var q/*|CFloat4*/ = QZero();

		QToRotationYawPitchRoll(yaw, pitch, roll, q);

		return q;

	};

	function QToRotationYawPitchRoll(yaw/*|Number*/, pitch/*|Number*/, roll/*|Number*/, result/*|CFloat4*/)/*|void*/{

		var hr/*|Number*/ = roll * 0.5,

		hp/*|Number*/ = pitch * 0.5,

		hy/*|Number*/ = yaw * 0.5,

		sy/*|Number*/ = qSin(hy),

		cy/*|Number*/ = qCos(hy),

		sp/*|Number*/ = qSin(hp),

		cp/*|Number*/ = qCos(hp),

		sr/*|Number*/ = qSin(hr),

		cr/*|Number*/ = qCos(hr);

		result.X() = cy * sp * cr + sy * cp * sr;

		result.Y() = sy * cp * cr - cy * sp * sr;

		result.Z() = cy * cp * sr - sy * sp * cr;

		result.W() = cy * cp * cr + sy * sp * sr;

	};

	function QRotationAxis(axis/*|CFloat4*/, angle/*|Number*/)/*|CFloat4*/{

		var s/*|Number*/ = qSin(angle / 2),

		c/*|Number*/ = qCos(angle / 2);

		return QNew(axis.X() * s, axis.Y() * s, axis.Z() * s, axis.W() * c);

	};

	function QConjugate(q/*|CFloat4*/)/*|CFloat4*/{

		return QNew(q.X(), -q.Y(), -q.Z(), -q.W());

	};

	function QFromRotationMatrix(M/*|CFloat4x4*/)/*|CFloat4*/{

		var a/*|Number*/ = M.e11,

		d/*|Number*/ = M.e21,

		g/*|Number*/ = M.e13;

		var b/*|Number*/ = M.e12,

		e/*|Number*/ = M.e22,

		h/*|Number*/ = M.e32;

		var c/*|Number*/ = M.e13,

		f/*|Number*/ = M.e23,

		i/*|Number*/ = M.e33;

		var tr/*|Number*/ = a + e + i,

		s/*|Number*/, x/*|Number*/, y/*|Number*/, z/*|Number*/, w/*|Number*/;

		if (tr > 0) {

			s = 0.5 / qSqrt(tr + 1);

			w = 0.25 / s;

			x = (f - h) * s;

			y = (g - c) * s;

			z = (b - d) * s;

		}

		else if (a > e > i) {

			s = 2.0 * qSqrt(1.0 + a - e - i);

			w = (f - h) / s;

			x = 0.25 * s;

			y = (d - b) / s;

			z = (g - c) / s;

		}

		else if (e > i) {

			s = 20 * qSqrt(1 + e + a + i);

			w = (g - c) / s;

			x = (d + b) / s;

			y = 0.25 * s;

			z = (h - f) / s;

		}

		else {

			s = 2.0 * qSqrt(1 + e - a - i);

			w = (d - b) / s;

			x = (g + c) / s;

			y = (h + f) / s;

			z = 0.25 * s;

		}

		return QNew(x, y, z, w);

	};

	function QToRotationMatrix(q/*|CFloat4*/, M/*|CFloat4x4*/)/*|void*/{

		var xx/*|Number*/ = q.X() * q.X(),

		yy/*|Number*/ = q.Y() * q.Y(),

		zz/*|Number*/ = q.Z() * q.Z(),

		xy/*|Number*/ = q.X() * q.Y(),

		xz/*|Number*/ = q.X() * q.Z(),

		yz/*|Number*/ = q.Y() * q.Z(),

		xw/*|Number*/ = q.X() * q.W(),

		zw/*|Number*/ = q.Z() * q.W(),

		yw/*|Number*/ = q.Y() * q.W();

		M.Reset(1-(2*(yy+zz)), 2*(xy+zw),2*(xz-yw),0, 2*(xy-zw),1-(2*(zz+xx)),

		2*(yz-xw),0, 2*(xz+yw),2*(yz-xw),1-(2*(yy+xx)),0, 0,0,0,1);

	};

	function QToEulerAngles(q/*|CFloat4*/, v3result/*|CFloat3*/)/*|void*/{

		var qx/*|Number*/ = q.X(),

		qy/*|Number*/ = q.Y(),

		qz/*|Number*/ = q.Z(),

		qw/*|Number*/ = q.W(),

		qxy/*|Number*/ = qx * qy,

		qxz/*|Number*/ = qx * qz,

		qwy/*|Number*/ = qw * qy,

		qwz/*|Number*/ = qw * qz,

		qwx/*|Number*/ = qw * qx,

		qyz/*|Number*/ = qy * qz,

		sqx/*|Number*/ = qx * qx,

		sqy/*|Number*/ = qy * qy;

		var det/*|Number*/ = sqx + sqy,

		x/*|Number*/, y/*|Number*/, z/*|Number*/;

		if (det !== 0.000 && det !== 1.000) {

			x = qAtan2(qxz + qwy, qwx - qyz);

			y = qAcos(1 - 2 * det);

			z = qAtan2(qxz - qwy, qwx + qyz);

		}

		else if (det === 0.0) {

			x = 0.0;

			y = 0.0;

			z = qAtan2(qxy - qwz, 0.5 - sqy - qz * qz);

		}

		else {

			x = qAtan2(qxy - qwz, 0.5 - sqy - qz * qz);

			y =qPI;

			z = 0.0;

		}

		v3result.Reset(x,y,z);

	};

	function QEulerAngles(q/*|CFloat4*/)/*|CFloat3*/{

		var v3/*|CFloat3*/ = V3Zero();

		QToEulerAngles(q, v3);

		return v3;

	};

	function QRotationAlphaBetaGamma(alpha/*|Number*/, beta/*|Number*/, gamma/*|Number*/, result/*|CFloat4*/) {

		var halfGammaPlusAlpha/*|Number*/ = (gamma + alpha) * 0.5;

		var halfGammaMinusAlpha/*|Number*/ = (gamma - alpha) * 0.5;

		var halfBeta/*|Number*/ = beta * 0.5;

		result.X() = qCos(halfGammaMinusAlpha) * qSin(halfBeta);

		result.Y() = qSin(halfGammaMinusAlpha) * qSin(halfBeta);

		result.Z() = qSin(halfGammaPlusAlpha) * qCos(halfBeta);

		result.W() = qCos(halfGammaPlusAlpha) * qCos(halfBeta);

	};

	function QSlerp(qLeft/*|CFloat4*/, qRight/*|CFloat4*/, amount/*|Number*/)/*|CFloat4*/{

		var num2/*|Number*/, num3/*|Number*/, num/*|Number*/ = amount,

		num4/*|Number*/ = (((qLeft.X() * qRight.X()) + (qLeft.Y() * qRight.Y())) + (qLeft.Z() * qRight.Z())) + (qLeft.W() * qRight.W());

		var bFlag/*|Boolean*/ = false;

		if (num4 < 0) {

			bFlag = true;

			num4 = -num4;

		}

		if (num4 > 0.999999) {

			num3 = 1 - num;

			num3 = bFlag ? -num : num;

		}

		else {

			var num5/*|Number*/ = qAcos(num4);

			var num6/*|Number*/ = (1.0 / qSin(num5));

			num3 = (qSin(1.0 - num) * num5) * num6;

			num2 = bFlag ? ((-qSin(num * num5)) * num6) : ((qSin(num * num5)) * num6);

		}

		return QNew(num3 * qLeft.X() + num2 * qRight.X(), num3 * qLeft.Y() + num2 * qRight.Y(), num3 * qLeft.Z() + num2 * qRight.Z(), num3 * qLeft.W() + num2 * qRight.W());

	};

	function QMultM4(q/*|CFloat4*/,M/*|CFloat4x4*/,result/*|CFloat4x4*/)/*|void*/{

		result.Set( ACV4(M_Mult_M(RV4(q),AM4(M))) );

	};

	/*

	ARRAY & FLOAT CONVERSION FUNCTIONS

	------------------------------------------------------------------------------------

	*/

	function AM4(M/*|CFloat4x4*/)/*|Array*/{

		return [[M.e11, M.e12, M.e13, M.e14], [M.e21, M.e22, M.e23, M.e24], [M.e31, M.e32, M.e33, M.e34], [M.e41, M.e42, M.e43, M.e44]];

	};

	function M4(A/*|Array*/)/*|CFloat4x4*/{

		return M4New(A[0][0], A[0][1], A[0][2], A[0][3], A[1][0], A[1][1], A[1][2], A[1][3], A[2][0], A[2][1], A[2][2], A[2][3], A[3][0], A[3][1], A[3][2], A[3][3]);

	};

	function A2(v/*|CFloat2*/)/*|Array*/{

		return [v.X(), v.Y()];

	};

	function V2(A/*|Array*/)/*|CFloat2*/{

		return QB.CFloat2.New(A[0], A[1]);

	};

	function A3(v/*|CFloat3*/)/*|Array*/{

		return [v.X(), v.Y(), v.Z()];

	};

	function V3(A/*|Array*/)/*|CFloat3*/{

		return QB.CFloat3.New(A[0], A[1], A[2]);

	};

	function A4(v/*|CFloat4*/)/*|Array*/{

		return [v.X(), v.Y(), v.Z(), v.W()];

	};

	function V4(A/*|Array*/)/*|CFloat4*/{

		return QB.CFloat4.New(A[0], A[1], A[2], A[3]);

	};

	// COLUMN VECTORS

	function CV3(u/*|CFloat3*/)/*|Array*/{

		return [[u.X()], [u.Y()], [u.Z()]];

	};

	function ACV3(A2D/*|Array*/)/*|CFloat3*/{

		return V3New(A2D[0][0], A2D[1][0], A2D[2][0]);

	};

	function CV4(u/*|CFloat4*/)/*|Array*/{

		return [[u.X()], [u.Y()], [u.Z()], [u.W()]];

	};

	function ACV4(A2D/*|Array*/)/*|CFloat4*/{

		return QNew(A2D[0][0], A2D[1][0], A2D[2][0], A2D[3][0]);

	};

	// ROW VECTORS

	function RV3(u/*|CFloat3*/)/*|Array*/{

		return [[u.X(), u.Y(), u.Z()]];

	};

	function RV4(u/*|CFloat4*/)/*|Array*/{

		return [[u.X(), u.Y(), u.Z(), u.W()]];

	};

	/*

	MATRIX

	------------------------------------------------------------------------------------

	- New

	- Zero

	- Add

	- Sub

	- Mult

	- MultQ

	- MultTranspose

	- Scale

	- Compose

	- Decompose

	- Determinant

	- Inverse

	- Trace

	- Transpose

	- RotationX

	- RotationY

	- RotationZ

	- RotationAxis

	- RotationQ

	- Translate

	- Identity

	- IsIdentity

	- LookAtLH

	- LookAtRH

	- Reflect

	- AffineTransform

	- AffineTransform2D

	- OrthoLH

	- OrthoRH

	- OrthoOffCenterLH

	- OrthoOffCenterRH

	- PerspectiveFovLH

	- PerspectiveFovRH

	- PerspectiveLH

	- PerspectiveRH

	- Shadow

	- Scaling

	*/

	// MATRIX CONSTRUCTORS:

	function M4New(

	e11/*|Number*/ = 0.0, e12/*|Number*/ = 0.0, e13/*|Number*/ = 0.0, e14/*|Number*/ = 0.0,

	e21/*|Number*/ = 0.0, e22/*|Number*/ = 0.0, e23/*|Number*/ = 0.0, e24/*|Number*/ = 0.0,

	e31/*|Number*/ = 0.0, e32/*|Number*/ = 0.0, e33/*|Number*/ = 0.0, e34/*|Number*/ = 0.0,

	e41/*|Number*/ = 0.0, e42/*|Number*/ = 0.0, e43/*|Number*/ = 0.0, e44/*|Number*/ = 0.0

	)/*|CFloat4x4*/{

		return CFloat4x4.New(e11, e12, e13, e14, e21, e22, e23, e24, e31, e32, e33, e34, e41, e42, e43, e44);

	};

	function M4Zero()/*|CFloat4x4*/{

		return M4New();

	};

	// MATRIX BASIC OPERATIONS:

	function M4Add(A/*|CFloat4x4*/, B/*|CFloat4x4*/,result/*|CFloat4x4*/)/*|void*/{

		result.Reset(

		A.e11 + B.e11, A.e12 + B.e12, A.e13 + B.e13, A.e14 + B.e14,

		A.e21 + B.e21, A.e22 + B.e22, A.e23 + B.e23, A.e24 + B.e24,

		A.e31 + B.e31, A.e32 + B.e32, A.e33 + B.e33, A.e34 + B.e34,

		A.e41 + B.e41, A.e42 + B.e42, A.e43 + B.e43, A.e44 + B.e44);

	};

	function M4Sub(A/*|CFloat4x4*/, B/*|CFloat4x4*/,result/*|CFloat4x4*/)/*|void*/

	{

		result.Reset(

		A.e11 - B.e11, A.e12 - B.e12, A.e13 - B.e13, A.e14 - B.e14,

		A.e21 - B.e21, A.e22 - B.e22, A.e23 - B.e23, A.e24 - B.e24,

		A.e31 - B.e31, A.e32 - B.e32, A.e33 - B.e33, A.e34 - B.e34,

		A.e41 - B.e41, A.e42 - B.e42, A.e43 - B.e43, A.e44 - B.e44);

	};

	function M4ScaleIn(k/*|Number*/,M/*|CFloat4x4*/ )/*|void*/{

		M.e11 *= k;

		M.e12 *= k;

		M.e13 *= k;

		M.e14 *= k;

		M.e21 *= k;

		M.e22 *= k;

		M.e23 *= k;

		M.e24 *= k;

		M.e31 *= k;

		M.e32 *= k;

		M.e33 *= k;

		M.e34 *= k;

		M.e41 *= k;

		M.e42 *= k;

		M.e43 *= k;

		M.e44 *= k;

	};

	function M4Scale(M/*|CFloat4x4*/, k/*|Number*/)/*|CFloat4x4*/{

		var R/*|CFloat4x4*/ = M.clone();

		M4ScaleIn(k,R);

		return R;

	};

	function M4Mult(  A/*|CFloat4x4*/, B/*|CFloat4x4*/,result/*|CFloat4x4*/)/*|void*/{

		var R/*|Array*/= M_Mult_M(AM4(A), AM4(B));

		result.Set( M4(R) );

	};

	function M4Identity()/*|CFloat4x4*/{

		return M4New(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

	};

	function M4Det(M/*|CFloat4x4*/)/*|Number*/{

		return 0;

	};

	function M4MultQ( M/*|CFloat4x4*/, q/*|CFloat4*/,result/*|CFloat4*/ )/*|void*/{

		result.Set( V4(M_Mult_M(AM4(M), CV4(q))) );

	};

	function M4Compose( scale/*|CFloat3*/,rotation/*|CFloat4*/,translation/*|CFloat3*/ ,result/*|CFloat4x4*/)/*|void*/{

		var sM/*|CFloat4x4*/ = M4New(scale.X(),0,0,0, 0,scale.Y(),0,0, 0,0,scale.Z(),0, 0,0,0,1.0);

		var rM/*|CFloat4x4*/=M4Zero();

		QToRotationMatrix(rotation,rM);

		M4Mult(sM,rM,result);

		M4Translate(result,translation);

	};

	function M4Decompose( scale/*|CFloat3*/,rotation/*|CFloat3*/,translation/*|CFloat3*/ ,result/*|CFloat4x4*/)/*|void*/

	{

		//////////////////////////////////////////////////////////////

	};

	function M4RotationEulerAxis( angle/*|Number*/, result/*|CFloat4x4*/)/*|CFloat4x4*/{

		return M4Zero();

	};

	function M4Translate( M/*|CFloat4x4*/,translation/*|CFloat3*/)/*|void*/

	{

		M.e41 = translation.X();

		M.e42 = translation.Y();

		M.e43 = translation.Z();

	};

	function M4Translation(  translation/*|CFloat3*/,result/*|CFloat4x4*/)/*|void*/{

		result.Reset(1,0,0,0, 0,1,0,0, 0,0,1,0, translation.X(),translation.Y(),translation.Z(),1);

	};

	function M4Scaling(  scale/*|CFloat3*/,result/*|CFloat4x4*/)/*|void*/{

		result.Reset(scale.X(),0,0,0, 0,scale.Y(),0,0, 0,0,scale.Z(),0, 0,0,0,1);

	};

	function M4Skewing( angle/*|Number*/, result/*|CFloat4x4*/)/*|void*/

	{

		result.Reset(1,qCot(angle),0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

	};

	function M4RotationX( angle/*|Number*/,result/*|CFloat4x4*/ )/*|void*/{

		var s/*|Number*/ = qSin(angle),

		c/*|Number*/ = qCos(angle);

		result.Reset(1,0,0,0, 0,c,s,0, 0,-s,c,0, 0,0,0,1);

	};

	function M4RotationY( angle/*|Number*/,result/*|CFloat4x4*/ )/*|void*/{

		var s/*|Number*/ = qSin(angle),

		c/*|Number*/ = qCos(angle);

		result.Reset(c,0,-s,0, 0,1,0,0, s,0,c,0, 0,0,0,1);

	};

	function M4RotationZ( angle/*|Number*/,result/*|CFloat4x4*/)/*|void*/  {

		var s/*|Number*/ = qSin(angle),

		c/*|Number*/ = qCos(angle);

		result.Reset(c,s,0,0, -s,c,0,0, 0,0,1,0, 0,0,0,1);

	};

	function M4RotationAxis( angle/*|Number*/, axis/*|CFloat3*/,  result/*|CFloat4x4*/ )/*|void*/{

		V3Normalize(axis);

		var s/*|Number*/ = qSin(-angle),

		c/*|Number*/ = qCos(-angle),

		c1/*|Number*/ = 1 - c,

		x/*|Number*/ = axis.X(),

		y/*|Number*/ = axis.Y(),

		z/*|Number*/ = axis.Z(),

		xx/*|Number*/ = x * x,

		xy/*|Number*/ = x * y,

		xz/*|Number*/ = x * z,

		yy/*|Number*/ = y * y,

		zz/*|Number*/ = z * z,

		yz/*|Number*/ = y * z;

		result.Reset( xx*c1+c, xy*c1-z*s, xz*c1+y*s, 0, xy*c1+z*s, yy*c1+c, yz*c1-x*s, 0, xz*c1-y*s, yz*c1+x*s, zz*c1+c, 0, 0,0,0,1);

	};

	function M4RotationYawPitchRoll( ypr/*|CFloat3*/,result/*|CFloat4x4*/) {

		var xR/*|CFloat4x4*/=M4Zero(),yR/*|CFloat4x4*/=M4Zero(),zR/*|CFloat4x4*/=M4Zero();

		M4RotationX(ypr.Y(),xR);

		M4RotationY(ypr.X(),yR);

		M4RotationZ(ypr.Z(),zR);

		//M4Mult(Rz,Rx,Rzx);

		//M4Mult(Rzx,Ry,result);

		result.Set(zR.mult(xR).mult(yR));

	};

	function M4PerspectiveLH( width/*|Number*/, height/*|Number*/, znear/*|Number*/, zfar/*|Number*/,result/*|CFloat4x4*/)/*|void*/{

		result.Reset( 2*znear/width,0,0,0, 0,2*znear/height,0,0, 0,0,zfar/(zfar-znear),1, 0,0,znear*zfar/(znear-zfar),0);

	};

	function M4PerspectiveRH( width/*|Number*/, height/*|Number*/, znear/*|Number*/, zfar/*|Number*/,result/*|CFloat4x4*/)/*|void*/{

		result.Reset( 2*znear/width,0,0,0, 0,2*znear/height,0,0, 0,0,zfar/(znear-zfar),-1, 0,0,znear*zfar/(znear-zfar),0);

	};

	function M4PerspectiveFovRH( fovY/*|Number*/, aspect/*|Number*/, znear/*|Number*/, zfar/*|Number*/,result/*|CFloat4x4*/)/*|void*/{

		var yScale/*|Number*/ = qCot(fovY/2.0),xScale/*|Number*/= yScale/aspect;

		result.Reset(xScale,0,0,0, 0,yScale,0,0, 0,0,zfar/(znear-zfar),-1, 0,0,znear*zfar/(znear-zfar),0);

	};

	function M4PerspectiveFovLH(fovY/*|Number*/, aspect/*|Number*/, znear/*|Number*/, zfar/*|Number*/,result/*|CFloat4x4*/)/*|void*/{

		var yScale/*|Number*/ = qCot(fovY/2.0),xScale/*|Number*/= yScale/aspect;

		result.Reset(xScale,0,0,0, 0,yScale,0,0, 0,0,zfar/(zfar-znear),1, 0,0,-znear*zfar/(zfar-znear),0);

	};

	function M4PerspectiveOffCenterRH( rect/*|CFloat4*/, zn/*|Number*/, zf/*|Number*/, result/*|CFloat4x4*/ )/*|void*/{

		var l/*|Number*/ = rect.X(),r/*|Number*/=rect.Z(),b/*|Number*/=rect.Y(),t/*|Number*/=rect.W();

		result.Reset(2*zn/(r-l),0,0,0, 0,2*zn/(t-b),0,0, (l+r)/(r-l),(t+b)/(t-b),zf/(zn-zf),-1, 0,0,zn*zf/(zn-zf),0);

	};

	function M4PerspectiveOffCenterLH( rect/*|CFloat4*/, zn/*|Number*/, zf/*|Number*/,result/*|CFloat4x4*/)/*|void*/{

		var l/*|Number*/ = rect.X(),r/*|Number*/=rect.Z(),b/*|Number*/=rect.Y(),t/*|Number*/=rect.W();

		result.Reset(2*zn/(r-l),0,0,0, 0,2*zn/(t-b),0,0, (l+r)/(l-r),(t+b)/(b-t),zf/(zf-zn),1, 0,0,zn*zf/(zn-zf),0);

	};

	function M4PerspectiveGeneric( pa/*|CFloat3*/, pb/*|CFloat3*/, pc/*|CFloat3*/, pe/*|CFloat3*/, n/*|Number*/, f/*|Number*/, result/*|CFloat4x4*/){

		var va/*|CFloat3*/,vb/*|CFloat3*/,vc/*|CFloat3*/;

		var vr/*|CFloat3*/,vu/*|CFloat3*/,vn/*|CFloat3*/;

		var l/*|Number*/,r/*|Number*/,t/*|Number*/,b/*|Number*/, nd/*|Number*/, M/*|CFloat4x4*/,d/*|Number*/;

		// Compute an orthonormal basis for the screen. FVec2, FVec3, FVec4, FQuat, FMat4

		V3Sub(pb,pa,vr);

		V3Sub(pc,pa,vu);

		V3Normalize(vr);

		V3Normalize(vu);

		// Compute the screen corner vectors.

		V3Sub(pa,pe,va);

		V3Sub(pb,pe,vb);

		V3Sub(pc,pe,vc);

		// Find the distance from the eye to screen plane.

		d = -V3Dot(va,vn);

		nd = n/d;

		// Find the extent of the perpendicular projection.

		l = V3Dot(vr,va) * nd;

		r = V3Dot(vr,vb) * nd;

		b = V3Dot(vu,va) * nd;

		t = V3Dot(vu,vc) * nd;

		// Load the perpendicular projection.

		/*

		glMatrixMode(GL_PROJECTION);

		glLoadIdentity();

		glFrustrum(l,r,b,r,n,f);

		*/

		// CM = PM * ( Frustrum * I )

		// Rotate the projection to be non-perpendicular

		M = M4New( vr.X(),vu.X(),vn.X(),0, vr.Y(),vu.Y(),vn.Y(),0, vr.Z(),vu.Z(),vn.Z(),0, 0,0,0,1.0);

		// M4Mult( CM,M ); || glMultMatrixf(M);

		// Move the apex of the frustrum to the origin

		// glTranslatef( -pe.X(),-pe.Y(), -pe.Z() )

		// glMatrixMode(GL_MODELVIEW);

		result.Reset();

	};

	function M4LookAtLH( eye/*|CFloat3*/, target/*|CFloat3*/, up/*|CFloat3*/, result/*|CFloat4x4*/)/*|void*/{

		/*

		// glLookAt

		//var forward = V3Sub(target,eye),side=V3Zero();

		V3Normalize(forward);

		V3Cross(side,forward,up);

		V3Normalize(side);

		V3Cross(side,forward,up);

		var M = M4Identity();

		M.e11 = side.X();

		M.e21 = side.Y();

		M.e31 = side.Z();

		M.e12 = up.X();

		M.e22 = up.Y();

		M.e32 = up.Z();

		M.e13 = -forward.X();

		M.e23 = -forward.Y();

		M.e33 = -forward.Z();

		M4Mult(result,CM,M);

		eye = V3Inverse(eye);

		M4Translation(result,eye);*/

		var zA/*|CFloat3*/ = target.minus(eye); 	zA.normalize();

		var xA/*|CFloat3*/ = up.cross(zA); 	xA.normalize();

		var yA/*|CFloat3*/ = zA.cross(xA); 	yA.normalize();

		var eA/*|CFloat3*/ = QB.CFloat3.New( -xA.dot(eye), -yA.dot(eye), -zA.dot(eye) );

		result.Reset(xA.X(),yA.X(),zA.X(),0, xA.Y(),yA.Y(),zA.Y(),0, xA.Z(),yA.Z(),zA.Z(),0, eA.X(),eA.Y(), eA.Z(), 1 );

	};

	function M_Zero()/*|Array*/{

		return [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	};

	function M_Copy(S/*|Array*/, D/*|Array*/)/*|void*/{

		for (var i/*|int*/ = 0; i < S.length; i++)

		for (var j/*|int*/ = 0; j < S[0].length; j++)

		D[i][j] = S[i][j];

	};

	function M_Identity(n/*|Number*/ = 4)/*|Array*/{

		var M/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < n; i++) {

			var r/*|Array*/ = [];

			for (var j/*|int*/ = 0; j < n; j++) {

				r.push(0);

			}

			M.push(r)

		};

		return M;

	};

	function MatrixQ(m/*|Array*/)/*|Boolean*/ {

		if (m.length < 1) return false;

		// m = [[1,3]]

		if (TypeOf(m[0],"Array")) {

			var len/*|Array*/ = [];

			for (var i/*|int*/ = 0; i < m.length; i++) {

				if (!TypeOf(m[i],"Array")) return false;

				for (var j/*|int*/ = 0; j < m[i].length; j++) {

					if (!TypeOf(m[i][j],"Number")) return false;

				}

				if (len.indexOf(m[i].length) < 0) len.push(m[i].length);

			}

			return len.length == 1;

		}

		return false;

	};

	function M_Add(A/*|Array*/, B/*|Array*/)/*|Array*/{

		return [];

	};

	function M_Scale(M/*|Array*/, scalar/*|Number*/)/*|Array*/{

		var R/*|Array*/ = []

		for (var r/*|int*/ = 0; r < M.length; r++) {

			var i/*|Array*/ = [];

			for (var c/*|int*/ = 0; c < M[r].length; c++) i[c] = M[r][c] * scalar;

			R[r] = i;

		}

		return R;

	};

	function M_Transpose(M/*|Array*/)/*|Array*/{

		var R/*|Array*/ = [];

		for (var r/*|int*/ = 0; r < M.length; r++)

		R[r] = M_ColumnAt(r, M);

		return R;

	};

	function M_Mult_M(A/*|Array*/, B/*|Array*/)/*|Array*/{

		//

		if (A[0].length == B.length) {

			var R/*|Array*/ = []

			for (var i/*|int*/ = 0; i < A.length; i++) {

				var r/*|Array*/ = []

				for (var n/*|int*/ = 0; n < B[0].length; n++) {

					r.push(qDot(A[i], M_ColumnAt(n, B)));

				}

				R.push(r);

			}

			return R;

		}

		return null;

	};

	function M_ColumnAt(index/*|int*/, M/*|Array*/) {

		var result/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < M.length; i++)

		result[i] = M[i][index];

		return result;

	};

	function M_RowSwitch(M/*|Array*/, roe14/*|Number*/, roe24/*|uint*/)/*|Array*/{

		for (var r/*|int*/ = 0; r < M.length; r++)

		for (var c/*|int*/ = 0; c < M[0].length; c++)

		//M[r][c] *= scalar;

		{

		}

		return M;

	};

	function M_Norm(M/*|Array*/, p/*|int*/ = 1)/*|Number*/{

		var r/*|Array*/ = [];

		for (var i/*|int*/ = 0; i < M.length; i++)

		for (var j/*|int*/ = 0; j < M[i].length; j++)

		r.push(M[i][j]);

		return VNorm(r, p);

	};

	function M_Print(M/*|Array*/)/*|String*/{

		var s/*|String*/ = "";

		for (var i/*|int*/ = 0; i < M.length; i++) {

			s += "| ";

			for (var j/*|int*/ = 0; j < M[i].length; j++)

			s += M[i][j] + (j == M[i].length - 1 ? "" : ",");

			s += " |" + (i == M.length - 1 ? "\n\n" : "\n");

		}

		return s;

	};

	/*

	PROJECTIONS

	------------------------------------------------------------------------------------

	*/

	function VProj_Isometric(u/*|Array*/)/*|Array*/{

		return [];

	};

	function VProj_Dimetric(u/*|Array*/)/*|Array*/{

		return [];

	};

	function VProj_Trimetric(u/*|Array*/)/*|Array*/{

		return [];

	};

	function VProj_Orthographic(u/*|Array*/, scalar/*|Array*/, offset/*|Array*/)/*|Array*/{

		// scalar

		// v - point

		// offset

		return [scalar[0] * u[0] + offset[0], scalar[2] * u[2] + offset[2]];

	};

	function VProj_Perspective(u/*|Array*/, camera/*|Array*/, orientation/*|Array*/, FOV/*|Array*/)/*|Array*/{

		// RotationX,RotationY,RotationZ

		return [];

	};

	/*

	COLOR SPACE

	------------------------------------------------------------------------------------

	*/

	function C_RGBA_DEC( color/*|CFloat4*/ )/*|Number*/{

		return ((color.W() << 24) +( color.X() << 16 )+ (color.Y() << 8) + color.Z() );

	};

	function C_DEC_RGB( c/*|uint*/ )/*|CFloat3*/{

		return  {r:(c & 0xFF0000) >> 16,g:(c & 0x00FF00) >> 8, b:(c & 0x0000FF)};

	};

	function C_DEC_RGBA( c/*|uint*/ )/*|CFloat4*/{

		return QB.CFloat4.New( (c & 0x00FF0000) >> 16,(c & 0x0000FF00) >> 8,(c & 0x000000FF),(c & 0xFF000000) >> 24);

	};

	function C_RGB_HSL(R/*|Number*/, G/*|Number*/, B/*|Number*/)/*|Array*/ // HSL

	{

		var r/*|Number*/ = R / 255;

		var g/*|Number*/ = G / 255;

		var b/*|Number*/ = B / 255;

		var M/*|Number*/ = qMax(r, g, b);

		var m/*|Number*/ = qMin(r, g, b);

		var h/*|Number*/, s/*|Number*/, l/*|Number*/ = (M + m) / 2,

		d/*|Number*/ = M - m;

		if (d == 0) h = 0;

		else if (M == r) h = ((g - b) / d) % 6;

		else if (M == g) h = (b - r) / d + 2;

		else h = (r - g) / d + 4;

		h *= 60;

		s = d == 0 ? 0 : d / (1 - qAbs(2 * l - 1));

		s *= 100;

		l *= 100;

		return [qRound(h), qRound(s), qRound(l)];

	};

	function C_HSL_RGB(H/*|Number*/, S/*|Number*/, L/*|Number*/, A/*|Number*/= 1.0)/*|Array*/ // RGB

	{

		var r/*|Number*/, g/*|Number*/, b/*|Number*/;

		var h/*|Number*/ = qMin(H, 359),

		s/*|Number*/ = S / 100,

		l/*|Number*/ = L / 100,

		hh/*|Number*/ = h / 60,

		C/*|Number*/ = (1 - qAbs(2 * l - 1)) * s,

		X/*|Number*/ = C * (1 - qAbs(hh % 2 - 1));

		if (hh >= 0 && hh < 1) {

			r = C;

			g = X;

		}

		else if (hh >= 1 && hh < 2) {

			r = X;

			g = C;

		}

		else if (hh >= 2 && hh < 3) {

			g = C;

			b = X;

		}

		else if (hh >= 3 && hh < 4) {

			g = X;

			b = C;

		}

		else if (hh >= 4 && hh < 5) {

			r = X;

			b = C;

		}

		else {

			r = C;

			b = X;

		}

		var m/*|Number*/ = l - C / 2;

		r += m;

		g += m;

		b += m;

		r *= 255;

		g *= 255;

		b *= 255;

		return [qRound(r), qRound(g), qRound(b), A];

	};

	function C_RGB_HSV(r/*|Number*/, g/*|Number*/, b/*|Number*/)/*|Array*/ // HSV

	{

		r = r > 0 ? r / 255 : 0;

		g = g > 0 ? g / 255 : 0;

		b = b > 0 ? b / 255 : 0;

		var m/*|Number*/ = qMin(r, g, b);

		var M/*|Number*/ = qMax(r, g, b);

		var h/*|Number*/, s/*|Number*/, v/*|Number*/ = M;

		var d/*|Number*/ = M - m;

		if (d == 0) h = 0;

		else if (M == r) h = ((g - b) / d) % 6;

		else if (M == g) h = ((b - r) / d + 2);

		else h = (r - g) / d + 4;

		h *= 60;

		s = v == 0 ? 0 : d / v;

		s *= 100;

		v *= 100;

		return [qRound(h), qRound(s), qRound(v)];

	};

	function C_HSVRGB(h/*|Number*/, s/*|Number*/, v/*|Number*/)/*|Array*/ //RGB

	{

		h = qMin(h, 359);

		s = qMin(s, 100);

		v = qMin(v, 100);

		s /= 100;

		v /= 100;

		var C/*|Number*/ = v * s,

		hh/*|Number*/ = h / 60,

		X/*|Number*/ = C * (1 - qAbs(hh % 2 - 1)),

		r/*|Number*/ = 0,

		g/*|Number*/ = 0,

		b/*|Number*/ = 0;

		if (hh >= 0 && hh < 1) {

			r = C;

			g = X;

		}

		else if (hh >= 1 && hh < 2) {

			r = X;

			g = C;

		}

		else if (hh >= 2 && hh < 3) {

			g = C;

			b = X;

		}

		else if (hh >= 3 && hh < 4) {

			g = X;

			b = C;

		}

		else if (hh >= 4 && hh < 5) {

			r = X;

			b = C;

		}

		else {

			r = C;

			b = X;

		}

		var m/*|Number*/ = v - C;

		r += m;

		g += m;

		b += m;

		r *= 255;

		g *= 255;

		b *= 255;

		r = qRound(r);

		g = qRound(g);

		b = qRound(b);

		return [r, g, b];

	};

	function C_HSV2HWB(h/*|Number*/, s/*|Number*/, v/*|Number*/, A/*|Number*/ = 1)/*|CFloat4*/{

		return V4New(h, (1 - s) * v, 1 - v,A);

	};

	function C_HSV2RGB(H/*|Number*/, S/*|Number*/, V/*|Number*/, A/*|Number*/ = 1)/*|CFloat4*/{

		if (H < 0) return V4New(V, V, V, A);

		var i/*|Number*/ = Math.floor(H);

		var f/*|Number*/ = H - i;

		if (!(i & 1)) f = 1 - f; // if i is even

		var m/*|Number*/ = V * (1 - S);

		var n/*|Number*/ = V * (1 - S * f);

		switch (i) {

			case 6:

			case 0:

			return V4New(V, n, m, A);

			case 1:

			return V4New(n, V, m, A);

			case 2:

			return V4New(m, V, n, A);

			case 3:

			return V4New(m, n, V, A);

			case 4:

			return V4New(n, m, V, A);

			case 5:

			return V4New(V, m, n, A);

		}

		return V4New(H, S, V, A);

	};

	function C_HWB_HSV(H/*|Number*/, W/*|Number*/, B/*|Number*/, A/*|Number*/)/*|Array*/{

		return [H, 1 - (W / (1 - B)), 1 - B, A];

	};

	function C_HWB_RGB(H/*|Number*/, W/*|Number*/, B/*|Number*/)/*|Array*/{

		// H is on [0,6] range or UNDEFINED. W and B are given on [0,1].

		// RGB are each returned on [0,1]. NB, W+B <= 1 for valid RGB.

		var v/*|Number*/ = 1 - B;

		if (H == -1) return [v, v, v];

		var i/*|Number*/ = Math.floor(H);

		var f/*|Number*/ = H - i;

		if (i & 1) f = 1 - f; // if i is odd

		var n/*|Number*/ = W + f * (v - W); // linear interpolation between w and v

		switch (i) {

			case 6:

			case 0:

			return [v, B, W];

			case 1:

			return [n, v, W];

			case 2:

			return [W, v, n];

			case 3:

			return [W, n, v];

			case 4:

			return [n, W, v];

			case 5:

			return [v, W, n];

		}

		return [H, W, B];

	};

	function C_RGB_HWB(R/*|Number*/, G/*|Number*/, B/*|Number*/)/*|Array*/{

		// RGB are each on [0,1]. W and B are returned on [0,1] and H is

		// returned on [0,6]. Exception: H is returned UNDEFINED if W == 1 - B.

		var v/*|Number*/ = qMax(R, G, B);

		var w/*|Number*/ = qMin(R, G, B);

		var b/*|Number*/ = 1 - v;

		if (v == w) return [-1, w, b];

		var f/*|Number*/ = (R == w) ? G - B : ((G == w) ? B - R : R - G);

		var i/*|Number*/ = (R == w) ? 3 : ((G == w) ? 5 : 1);

		return [i - f / (v - w), w, b];

	};

	/*

	INTERPOLATION

	------------------------------------------------------------------------------------

	- Step 	= function(min,max){

		return t < 0.5?min:max;

	}

	- qLerp 	= function(min,max,t){

		return min+t*(max-min);

	}

	- qCosine 	= function(min,max,t){

		return qLerp(min,max, (-Math.qCos( Math.PI* t)/2)+0.5);

	}

	- SmoothStep 	= function(min,max,t){

		var t2 = t*t; return qLerp(min,max,t2*3 - t2*2*t);

	}

	- Acceleration 	= function(min,max,t){

		return qLerp(min,max,t*t);

	}

	- Deceleration 	= function(min,max,t){

		return qLerp(min,max,1-Math.pow(1-t,2));

	}

	- qInterpolation( data, method:( Hermite | Spline) ):[result]

	- HermiteInterpolate( data );

	- qCosineInterpolate( data );

	- qInterpolate( data, "hermite" )

	*/
	function qIntPart(x){
		return x - (1 - (x+1 - x ));
	}
	function qFloatPart(x){
		return 1 - (x+1 - x );
	}

	function qClamp(n/*|Number*/, min/*|Number*/=0, max/*|Number*/=1)/*|Number*/{

		return n < min ? min : n > max ? max : n;

	};

	function qLerp(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		return min + qClamp(t) * (max - min);

	};

	function qInterp_Step(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		return t < 0.5 ? min : max;

	};

	function qInterpolateCosine(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		var t2/*|Number*/ = (1 - qCos(t * PI) / 2);

		return (min * (1 - t2) + max * t2); /*qLerp(min,max, (-Math.qCos( Math.PI* t)/2)+0.5);*/

	};

	function qInterpolateSmoothStep(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		t = qClamp((t - min) / (max - min), 0, 1);

		return t * t * t * (t * (t * 6 - 15) + 10);

	};

	function qInterpolateAcceleration(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		return qLerp(min, max, t * t);

	};

	function qInterpolateDeceleration(min/*|Number*/, max/*|Number*/, t/*|Number*/)/*|Number*/{

		return qLerp(min, max, 1 - Math.pow(1 - t, 2));

	};

	function qInterpolateCubic(y0/*|Number*/, e12/*|Number*/, e22/*|Number*/, e32/*|Number*/, mu/*|Number*/)/*|Number*/{

		var a0/*|Number*/, a1/*|Number*/, a2/*|Number*/, a3/*|Number*/, mu2/*|Number*/;

		mu2 = mu * mu;

		a0 = e32 - e22 - y0 + e12;

		a1 = y0 - e12 - a0;

		a2 = e22 - y0;

		a3 = e12;

		return (a0 * mu * mu2 + a1 * mu2 + a2 * mu + a3);

	};

	function qInterpolateHermite(y0/*|Number*/, e12/*|Number*/, e22/*|Number*/, e32/*|Number*/, mu/*|Number*/, tension/*|Number*/, bias/*|Number*/)/*|Number*/{

		var m0/*|Number*/, m1/*|Number*/, mu2/*|Number*/, mu3/*|Number*/, a0/*|Number*/, a1/*|Number*/, a2/*|Number*/, a3/*|Number*/;

		var A/*|Number*/ = (1 + bias) * (1 - tension) / 2;

		var B/*|Number*/ = (1 - bias) * (1 - tension) / 2;

		mu2 = mu * mu;

		mu3 = mu2 * mu;

		m0 = (e12 - y0) * A;

		m0 += (e22 - e12) * B;

		m1 = (e22 - e12) * A;

		m1 += (e32 - e22) * B;

		a0 = 2 * mu3 + 3 * mu2 + 1;

		a1 = mu3 - 2 * mu2 + mu;

		a2 = mu3 - mu2;

		a3 = -2 * mu3 + 3 * mu2;

		return (a0 * e12 + a1 * m0 + a2 * m1 + a3 * e22);

	};

	function qLinearRegression()/*|Number*/{

		throw new Error("qLinearRegression is yet to be implemented!");

		//return 1;

	};

	/*

	SPLINES

	------------------------------------------------------------------------------------

	* Basis Functions

	- h1(t) := 2t^3 - 3t^2 + 1;

	- h2(t) := -2t^3 + 3t^2;

	- h3(t) := t^3 - 2t^2 + t;

	- h4(t) := t^3 - t^2;

	*/

	function qLinear( a/*|Number*/,b/*|Number*/,t/*|Number*/ )/*|Number*/{

		return (1-t)*a+t*b;

	}

	function qQuadratic( a/*|Number*/,b/*|Number*/,c/*|Number*/,t/*|Number*/)/*|Number*/

	{

		return (1-t)*(1-t)*a + 2 *(1-t)*t*b +t*t*c;

	}

	function qCubic(a/*|Number*/,b/*|Number*/,c/*|Number*/, d/*|Number*/,t/*|Number*/, basis/*|uint*/ = 1)/*|Number*/

	{

		return a+b*t+c*t*t;

	}

	/*

	UTILITES

	------------------------------------------------------------------------------------

	*/

	function Table(f/*|Function*/, args/*|Array*/, range/*|Array*/)/*|Array*/{

		// Table( qSin,['x'],['x',-3,34])

		return [];

	};
	let ExportTo = (function( exports) {
		
		exports.qIntPart = qIntPart;

		exports.qFloatPart = qFloatPart;

		exports.qFloat = qFloat;

		exports.qMax = qMax;

		exports.qMin = qMin;
	
		exports.qRound = qRound;
	
		exports.qRandf = qRandf;
	
		exports.qRand = qRand;
	
		exports.qBound = qBound;
	
		exports.qPercent = qPercent;
	
		exports.qSolve = qSolve;
	
		exports.qAbs = qAbs;
	
		exports.qCube = qCube;
	
		exports.qRoot = qRoot;
	
		exports.qSin = qSin;
	
		exports.qCos = qCos;
	
		exports.qTan = qTan;
	
		exports.qCot = qCot;
	
		exports.qCotD = qCotD;
	
		exports.qAsin = qAsin;
	
		exports.qAcos = qAcos;
	
		exports.qAtan = qAtan;
	
		exports.qAtan2 = qAtan2;
	
		exports.qSinD = qSinD;
	
		exports.qCosD = qCosD;
	
		exports.qTanD = qTanD;
	
		exports.qAsinD = qAsinD;
	
		exports.qAcosD = qAcosD;
	
		exports.qAtanD = qAtanD;
	
		exports.qAtan2D = qAtan2D;
	
		exports.qSqrt = qSqrt;
	
		exports.qPower = qPower;
	
		exports.qFactorial = qFactorial;
	
		exports.qBinomial = qBinomial;
	
		exports.qAverage = qAverage;
	
		exports.qRSqrt = qRSqrt;
	
		exports.qFixAngle = qFixAngle;
	
		exports.qCartesianToPolar = qCartesianToPolar;
	
		exports.qPolarToCartesian = qPolarToCartesian;
	
		exports.qLog = qLog;
	
		exports.V2New = V2New;
	
		exports.V3New = V3New;
	
		exports.V3Zero = V3Zero;
	
		exports.VectorQ = VectorQ;
	
		exports.Dimension = Dimension;
	
		exports.Add = Add;
	
		exports.V2Add = V2Add;
	
		exports.V2AddIn = V2AddIn;
	
		exports.VAddN = VAddN;
	
		exports.VSubN = VSubN;
	
		exports.VSub = VSub;
	
		exports.V2Sub = V2Sub;
	
		exports.V3Sub = V3Sub;
	
		exports.V4Sub = V4Sub;
	
		exports.VScale = VScale;
	
		exports.V2Scale = V2Scale;
	
		exports.VDivide = VDivide;
	
		exports.qCross = qCross;
	
		exports.V3Cross = V3Cross;
	
		exports.V4Cross = V4Cross;
	
		exports.QCross = QCross;
	
		exports.qDot = qDot;
	
		exports.V2Dot = V2Dot;
	
		exports.V3Dot = V3Dot;
	
		exports.V4Dot = V4Dot;
	
		exports.QDot = QDot;
	
		exports.qDistance = qDistance;
	
		exports.V2Distance = V2Distance;
	
		exports.V3Distance = V3Distance;
	
		exports.V4Distance = V4Distance;
	
		exports.QDistance = QDistance;
	
		exports.qCenter = qCenter;
	
		exports.V2Center = V2Center;
	
		exports.V3Center = V3Center;
	
		exports.V4Center = V4Center;
	
		exports.QCenter = QCenter;
	
		exports.qMag = qMag;
	
		exports.V2Mag = V2Mag;
	
		exports.V3Mag = V3Mag;
	
		exports.V4Mag = V4Mag;
	
		exports.QMag = QMag;
	
		exports.Direction = Direction;
	
		exports.VNormalize = VNormalize;
	
		exports.V2Normalize = V2Normalize;
	
		exports.V3Normalize = V3Normalize;
	
		exports.V4Normalize = V4Normalize;
	
		exports.IsAUnit = IsAUnit;
	
		exports.ScalarProjection = ScalarProjection;
	
		exports.VProjection = VProjection;
	
		exports.VRejection = VRejection;
	
		exports.qAngle = qAngle;
	
		exports.V2Angle = V2Angle;
	
		exports.V3Angle = V3Angle;
	
		exports.V4Angle = V4Angle;
	
		exports.QAngle = QAngle;
	
		exports.VPerpendicularQ = VPerpendicularQ;
	
		exports.VParallelQ = VParallelQ;
	
		exports.VInverse = VInverse;
	
		exports.V2Inverse = V2Inverse;
	
		exports.V3Inverse = V3Inverse;
	
		exports.V4Inverse = V4Inverse;
	
		exports.QInverse = QInverse;
	
		exports.qDirectionAngle = qDirectionAngle;
	
		exports.VNorm = VNorm;
	
		exports.V2Norm = V2Norm;
	
		exports.V3Norm = V3Norm;
	
		exports.V4Norm = V4Norm;
	
		exports.QNorm = QNorm;
	
		exports.V4New = V4New;
	
		exports.V3TransformCoords = V3TransformCoords;
	
		exports.QNew = QNew;
	
		exports.QZero = QZero;
	
		exports.QRotationYawPitchRoll = QRotationYawPitchRoll;
	
		exports.QToRotationYawPitchRoll = QToRotationYawPitchRoll;
	
		exports.QRotationAxis = QRotationAxis;
	
		exports.QConjugate = QConjugate;
	
		exports.QFromRotationMatrix = QFromRotationMatrix;
	
		exports.QToRotationMatrix = QToRotationMatrix;
	
		exports.QToEulerAngles = QToEulerAngles;
	
		exports.QEulerAngles = QEulerAngles;
	
		exports.QRotationAlphaBetaGamma = QRotationAlphaBetaGamma;
	
		exports.QSlerp = QSlerp;
	
		exports.QMultM4 = QMultM4;
	
		exports.AM4 = AM4;
	
		exports.M4 = M4;
	
		exports.A2 = A2;
	
		exports.V2 = V2;
	
		exports.A3 = A3;
	
		exports.V3 = V3;
	
		exports.A4 = A4;
	
		exports.V4 = V4;
	
		exports.CV3 = CV3;
	
		exports.ACV3 = ACV3;
	
		exports.CV4 = CV4;
	
		exports.ACV4 = ACV4;
	
		exports.RV3 = RV3;
	
		exports.RV4 = RV4;
	
		exports.M4New = M4New;
	
		exports.M4Zero = M4Zero;
	
		exports.M4Add = M4Add;
	
		exports.M4Sub = M4Sub;
	
		exports.M4ScaleIn = M4ScaleIn;
	
		exports.M4Scale = M4Scale;
	
		exports.M4Mult = M4Mult;
	
		exports.M4Identity = M4Identity;
	
		exports.M4Det = M4Det;
	
		exports.M4MultQ = M4MultQ;
	
		exports.M4Compose = M4Compose;
	
		exports.M4Decompose = M4Decompose;
	
		exports.M4RotationEulerAxis = M4RotationEulerAxis;
	
		exports.M4Translate = M4Translate;
	
		exports.M4Translation = M4Translation;
	
		exports.M4Scaling = M4Scaling;
	
		exports.M4Skewing = M4Skewing;
	
		exports.M4RotationX = M4RotationX;
	
		exports.M4RotationY = M4RotationY;
	
		exports.M4RotationZ = M4RotationZ;
	
		exports.M4RotationAxis = M4RotationAxis;
	
		exports.M4RotationYawPitchRoll = M4RotationYawPitchRoll;
	
		exports.M4PerspectiveLH = M4PerspectiveLH;
	
		exports.M4PerspectiveRH = M4PerspectiveRH;
	
		exports.M4PerspectiveFovRH = M4PerspectiveFovRH;
	
		exports.M4PerspectiveFovLH = M4PerspectiveFovLH;
	
		exports.M4PerspectiveOffCenterRH = M4PerspectiveOffCenterRH;
	
		exports.M4PerspectiveOffCenterLH = M4PerspectiveOffCenterLH;
	
		exports.M4PerspectiveGeneric = M4PerspectiveGeneric;
	
		exports.M4LookAtLH = M4LookAtLH;
	
		exports.M_Zero = M_Zero;
	
		exports.M_Copy = M_Copy;
	
		exports.M_Identity = M_Identity;
	
		exports.MatrixQ = MatrixQ;
	
		exports.M_Add = M_Add;
	
		exports.M_Scale = M_Scale;
	
		exports.M_Transpose = M_Transpose;
	
		exports.M_Mult_M = M_Mult_M;
	
		exports.M_ColumnAt = M_ColumnAt;
	
		exports.M_RowSwitch = M_RowSwitch;
	
		exports.M_Norm = M_Norm;
	
		exports.M_Print = M_Print;
	
		exports.VProj_Isometric = VProj_Isometric;
	
		exports.VProj_Dimetric = VProj_Dimetric;
	
		exports.VProj_Trimetric = VProj_Trimetric;
	
		exports.VProj_Orthographic = VProj_Orthographic;
	
		exports.VProj_Perspective = VProj_Perspective;
	
		exports.Convert_Color_RGBA_DEC = C_RGBA_DEC;
	
		exports.Convert_Color_DEC_RGB = C_DEC_RGB;
	
		exports.Convert_Color_DEC_RGBA = C_DEC_RGBA;
	
		exports.Convert_Color_RGB_HSL = C_RGB_HSL;
	
		exports.Convert_Color_HSL_RGB = C_HSL_RGB;
	
		exports.Convert_Color_RGB_HSV = C_RGB_HSV;
	
		exports.Convert_Color_HSVRGB = C_HSVRGB;
	
		exports.Convert_Color_HSV2HWB = C_HSV2HWB;
	
		exports.Convert_Color_HSV2RGB = C_HSV2RGB;
	
		exports.Convert_Color_HWB_HSV = C_HWB_HSV;
	
		exports.Convert_Color_HWB_RGB = C_HWB_RGB;
	
		exports.Convert_Color_RGB_HWB = C_RGB_HWB;
	
		exports.qClamp = qClamp;
	
		exports.qLerp = qLerp;
	
		exports.qInterp_Step = qInterp_Step;
	
		exports.qInterpolateCosine = qInterpolateCosine;
	
		exports.qInterpolateSmoothStep = qInterpolateSmoothStep;
	
		exports.qInterpolateAcceleration = qInterpolateAcceleration;
	
		exports.qInterpolateDeceleration = qInterpolateDeceleration;
	
		exports.qInterpolateCubic = qInterpolateCubic;
	
		exports.qInterpolateHermite = qInterpolateHermite;
	
		exports.qLinearRegression = qLinearRegression;
	
		exports.qLinear = qLinear;
	
		exports.qQuadratic = qQuadratic;
	
		exports.qCubic = qCubic;
	
		exports.qRadToDeg = qRadToDeg;

		exports.qDegToRad = qDegToRad;
	});

	CMath.ExportTo =  ExportTo;
	CMath.ExportTo( CMath );
	if( target != null ){
		target.ExportTo =  ExportTo;
		target.ExportTo( target );
	}

	return CMath;

});



