/*
 *  eXist EXPath Geo Module Extension
 *  Copyright (C) 2015 Jochen Graf <jochen.graf@uni-koeln.de>
 *  
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public License
 *  as published by the Free Software Foundation; either version 2
 *  of the License, or (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *  
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 *  
 *  $Id$
 */
package org.exist.xquery.modules.geo;

import java.io.ByteArrayInputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Map;

//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;

import org.exist.dom.QName;
import org.exist.xquery.BasicFunction;
import org.exist.xquery.FunctionSignature;
import org.exist.xquery.XPathException;
import org.exist.xquery.XQueryContext;
import org.exist.xquery.value.AnyURIValue;
import org.exist.xquery.value.AtomicValue;
import org.exist.xquery.value.Base64BinaryValueType;
import org.exist.xquery.value.BinaryValue;
import org.exist.xquery.value.BinaryValueFromInputStream;
import org.exist.xquery.value.BooleanValue;
import org.exist.xquery.value.DoubleValue;
import org.exist.xquery.value.IntegerValue;
import org.exist.xquery.value.Item;
import org.exist.xquery.value.Sequence;
import org.exist.xquery.value.SequenceIterator;
import org.exist.xquery.value.StringValue;
import org.exist.xquery.value.ValueSequence;

import com.vividsolutions.jts.geom.Geometry;
import com.vividsolutions.jts.geom.LineString;
import com.vividsolutions.jts.geom.LinearRing;
import com.vividsolutions.jts.geom.Polygon;
import com.vividsolutions.jts.io.ParseException;
import com.vividsolutions.jts.io.WKBWriter;
import com.vividsolutions.jts.io.WKTReader;
import com.vividsolutions.jts.io.WKTWriter;

/**
 * @author Jochen Graf <jochen.graf@uni-koeln.de>
 * @version EXPath Geo Module Candidate 30 September 2010 http://expath.org/spec/geo/20100930
 */
public class GeoFunctions extends BasicFunction {
    
    //private static final Logger LOG = LogManager.getLogger(GeoFunctions.class);
    
    public final static FunctionSignature[] signatures = new FunctionSignature[GeoModule.FUNC.size()];
    
    static {
        int i = 0;
        for (Map.Entry<String, GeoModule.Func> F : GeoModule.FUNC.entrySet()) {
            signatures[i] = new FunctionSignature(
                    new QName(F.getKey(), GeoModule.NAMESPACE_URI, GeoModule.PREFIX),
                    F.getValue().getDescription(),
                    F.getValue().getSequenceType(),
                    F.getValue().getReturnSequenceType()
                );
            i++;
        }
    }

    public GeoFunctions(XQueryContext context, FunctionSignature signature) {
        super(context, signature);
    }

    @Override
    public Sequence eval(Sequence[] args, Sequence contextSequence)
            throws XPathException {
        ValueSequence result = new ValueSequence();
        
        // ########################
        // 1 General Functions (12)
        // ########################
        
        if (isCalledAs(         "dimension")) {
            result.add(         funcDimension(args));
        } else if (isCalledAs(  "coordinate-dimension")) {
            /*not implemented*/ funcCoordinateDimension(args);
        } else if (isCalledAs(  "geometry-type")) {
            result.add(         funcGeometryType(args));
        } else if (isCalledAs(  "srid")) {
            result.add(         funcSrid(args));
        } else if (isCalledAs(  "envelope")) {
            result.add(         funcEnvelope(args));
        } else if (isCalledAs(  "as-text")) {
            result.add(         funcAsText(args));
        } else if (isCalledAs(  "as-binary")) {
            result.add(         funcAsBinary(args));
        } else if (isCalledAs(  "is-empty")) {
            result.add(         funcIsEmpty(args));
        } else if (isCalledAs(  "is-simple")) {
            result.add(         funcIsSimple(args));
        } else if (isCalledAs(  "is-3d")) {
        	/*not implemented*/ funcIs3d(args);
        } else if (isCalledAs(  "is-measured")) {
        	/*not implemented*/ funcIsMeasured(args);
        } else if (isCalledAs(  "boundary")) {
            result.add(         funcBoundary(args));
        }
        
        // ########################
        // 2 Spatial predicate functions (9)
        // ########################
        
        else if (isCalledAs(    "equals")) {
            result.add(         funcEquals(args));
        } else if (isCalledAs(  "disjoint")) {
            result.add(         funcDisjoint(args));
        } else if (isCalledAs(  "intersects")) {
            result.add(         funcIntersects(args));
        } else if (isCalledAs(  "touches")) {
            result.add(         funcTouches(args));
        } else if (isCalledAs(  "crosses")) {
            result.add(         funcCrosses(args));
        } else if (isCalledAs(  "within")) {
            result.add(         funcWithin(args));
        } else if (isCalledAs(  "contains")) {
            result.add(         funcContains(args));
        } else if (isCalledAs(  "overlaps")) {
            result.add(         funcOverlaps(args));
        } else if (isCalledAs(  "relate")) {
            result.add(         funcRelate(args));
        }
        
        // ########################
        // 3 Analysis functions (7)
        // ########################
        
        else if (isCalledAs(	"distance")) {
            result.add(			funcDistance(args));
        } else if (isCalledAs(  "buffer")) {
            result.add(         funcBuffer(args));
        } else if (isCalledAs(  "convex-hull")) {
            result.add(         funcConvexHull(args));
        } else if (isCalledAs(  "intersection")) {
            result.add(         funcIntersection(args));
        } else if (isCalledAs(  "union")) {
            result.add(         funcUnion(args));
        } else if (isCalledAs(  "difference")) {
            result.add(         funcDifference(args));
        } else if (isCalledAs(  "sym-difference")) {
            result.add(         funcSymDifference(args));
        }
        
        // ########################
        // 4 Functions specific to geometry type
        // ########################

        // 4.1 GeometryCollection (2)
        else if (isCalledAs(	"num-geometries")) {
        	result.add(			funcNumGeometries(args));
        } else if (isCalledAs(	"geometry-n")) {
        	result.add(			funcGeometryN(args));
        }
        // 4.2 Point (4)
        else if (isCalledAs(	"x")) {
        	result.add(			funcX(args));
        } else if (isCalledAs(	"y")) {
        	result.add(			funcY(args));
        } else if (isCalledAs(	"z")) {
        	result.add(			funcZ(args));
        } else if (isCalledAs(	"m")) {
        	                    funcM(args);
        }
        // 4.3 Curve (5)
        else if (isCalledAs(	"length")) {
        	/*not implemented for this type*/
        } else if (isCalledAs(	"start-point")) {
        	/*not implemented*/ funcStartPoint(args);
        } else if (isCalledAs(	"end-point")) {
        	/*not implemented*/ funcEndPoint(args);
        } else if (isCalledAs(	"is-closed")) {
        	/*not implemented for this type*/
        } else if (isCalledAs(	"is-ring")) {
        	/*not implemented*/ funcIsRing(args);
        }
        // 4.3.1 LineString, Line, LinearRing (2)
        else if (isCalledAs(	"num-points")) {
        	result.add(			funcNumPoints(args));
        } else if (isCalledAs(	"point-n")) {
        	result.add(			funcPointN(args));
        }
        // 4.4 MultiLineString (2)
        else if (isCalledAs(	"is-closed")) {
        	result.add(			funcIsClosed(args));
        } else if (isCalledAs(	"length")) {
        	result.add(			funcLength(args));
        }
        // 4.5 Surface (7)
        else if (isCalledAs(	"area")) {
        	result.add(			funcArea(args));
        } else if (isCalledAs(	"centroid")) {
        	result.add(			funcCentroid(args));
        } else if (isCalledAs(	"point-on-surface")) {
        	/*not implemented*/ funcPointOnSurface(args);
        } else if (isCalledAs(	"num-patches")) {
        	/*not implemented*/ funcNumPatches(args);
        } else if (isCalledAs(	"patch-n")) {
        	/*not implemented*/ funcPatchN(args);
        } else if (isCalledAs(	"bounding-polygons")) {
        	/*not implemented*/ funcBoundingPolygons(args);
        } else if (isCalledAs(	"is-closed")) {
        	result.add(			funcIsClosed(args));
        }
        // 4.6 Polygon (3)
        else if (isCalledAs(	"exterior-ring")) {
        	result.add(			funcExteriorRing(args));
        } else if (isCalledAs(	"num-interior-ring")) {
        	result.add(			funcNumInteriorRing(args));
        } else if (isCalledAs(	"interior-ring-n")) {
        	result.add(			funcInteriorRingN(args));
        }
        // 4.7 MultiSurface, MultiPolygon (3)
        else if (isCalledAs(	"area")) {
        	result.add(			funcArea(args));
        } else if (isCalledAs(	"centroid")) {
        	result.add(			funcCentroid(args));
        } else if (isCalledAs(	"point-on-surface")) {
        	/*not implemented*/ funcPointOnSurface(args);
        }
        
        return result;
    }
    
    // ########################
    // 0 Shared Functions
    // ########################
    
    private BooleanValue funcIsClosed(Sequence[] args) throws XPathException {
    	Geometry geo = geo(args[0].getStringValue());
    	return new BooleanValue(((LineString) geo).isClosed());
    }
    
    private DoubleValue funcLength(Sequence[] args) throws XPathException {
    	Geometry geo = geo(args[0].getStringValue());
    	return new DoubleValue(geo.getLength());
    }
    
    private DoubleValue funcArea(Sequence[] args) throws XPathException {
    	Geometry geo = geo(args[0].getStringValue());
    	return new DoubleValue(geo.getArea());
    }
    
    private StringValue funcCentroid(Sequence[] args) throws XPathException {
    	Geometry geo = geo(args[0].getStringValue());
    	return new StringValue(wkt(geo.getCentroid()));
    }
    
    private StringValue funcPointOnSurface(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
    }
    
    // ########################
    // 1 General Functions (12)
    // ########################

	private IntegerValue funcDimension(Sequence[] args) throws XPathException {
        int dimension = geo(args[0].getStringValue()).getDimension();
        return new IntegerValue(dimension);
    }
    
    private IntegerValue funcCoordinateDimension(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
    }
    
    private StringValue funcGeometryType(Sequence[] args) throws XPathException {
        String type = geo(args[0].getStringValue()).getGeometryType();
        return new StringValue(type);
    }
    
    private AnyURIValue funcSrid(Sequence[] args) throws XPathException {
        int uri = geo(args[0].getStringValue()).getSRID();
        return new AnyURIValue(String.valueOf(uri));
    }
    
    private StringValue funcEnvelope(Sequence[] args) throws XPathException {
        Geometry env = geo(args[0].getStringValue()).getEnvelope();
        return new StringValue(wkt(env));
    }
    
    private StringValue funcAsText(Sequence[] args) throws XPathException {
        Geometry geo = geo(args[0].getStringValue());
        return new StringValue(wkt(geo));
    }
    
    private BinaryValue funcAsBinary(Sequence[] args) throws XPathException {
        Geometry geo = geo(args[0].getStringValue());
        return BinaryValueFromInputStream.getInstance(context, new Base64BinaryValueType(),
                new ByteArrayInputStream(wkb(geo)));
    }
    
    private BooleanValue funcIsEmpty(Sequence[] args) throws XPathException {
        boolean is = geo(args[0].getStringValue()).isEmpty();
        return new BooleanValue(is);
    }
    
    private BooleanValue funcIsSimple(Sequence[] args) throws XPathException {
        boolean is = geo(args[0].getStringValue()).isSimple();
        return new BooleanValue(is);
    }
    
    private BooleanValue funcIs3d(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
    }
    
    private BooleanValue funcIsMeasured(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
    }
    
    private StringValue funcBoundary(Sequence[] args) throws XPathException {
        Geometry bound = geo(args[0].getStringValue()).getBoundary();
        return new StringValue(wkt(bound));
    }
    
    // ########################
    // 2 Spatial predicate functions (9)
    // ########################    
    
    private BooleanValue funcEquals(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.equals(geo2));
    }

    private BooleanValue funcDisjoint(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.disjoint(geo2));
    }

    private BooleanValue funcIntersects(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.intersects(geo2));
    }

    private BooleanValue funcTouches(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.touches(geo2));
    }

    private BooleanValue funcCrosses(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.crosses(geo2));
    }

    private BooleanValue funcWithin(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.within(geo2));
    }

    private BooleanValue funcContains(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.contains(geo2));
    }

    private BooleanValue funcOverlaps(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new BooleanValue(geo1.overlaps(geo2));
    }

    private BooleanValue funcRelate(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        String matrix = args[2].getStringValue();
        return new BooleanValue(geo1.relate(geo2, matrix));
    }
    
    // ########################
    // 3 Analysis functions (7)
    // ########################
    
    private DoubleValue funcDistance(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new DoubleValue(geo1.distance(geo2));
	}

	private StringValue funcBuffer(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		double dbl = Double.parseDouble(args[1].getStringValue());
		return new StringValue(wkt(geo.buffer(dbl)));
	}

	private StringValue funcConvexHull(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new StringValue(wkt(geo.convexHull()));
	}

	private StringValue funcIntersection(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new StringValue(wkt(geo1.intersection(geo2)));
	}

	private StringValue funcUnion(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new StringValue(wkt(geo1.union(geo2)));
	}

	private StringValue funcDifference(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new StringValue(wkt(geo1.difference(geo2)));
	}

	private StringValue funcSymDifference(Sequence[] args) throws XPathException {
        Geometry geo1 = geo(args[0].getStringValue());
        Geometry geo2 = geo(args[1].getStringValue());
        return new StringValue(wkt(geo1.symDifference(geo2)));
	}

    // ########################
    // 4 Functions specific to geometry type
    // ########################

    // 4.1 GeometryCollection (2)
	private IntegerValue funcNumGeometries(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new IntegerValue(geo.getNumGeometries());
	}

	private StringValue funcGeometryN(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		int n = Integer.parseInt(args[1].getStringValue());
		return new StringValue(wkt(geo.getGeometryN(n)));
	}

    // 4.2 Point (4)
	private StringValue funcX(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new StringValue(String.valueOf(geo.getCoordinate().x));
	}

	private StringValue funcY(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new StringValue(String.valueOf(geo.getCoordinate().y));
	}

	private StringValue funcZ(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new StringValue(String.valueOf(geo.getCoordinate().z));
	}

	private StringValue funcM(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}
	
    // 4.3 Curve (5)
	private DoubleValue funcLength__Duplicate1(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private StringValue funcStartPoint(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private StringValue funcEndPoint(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private BooleanValue funcIsClosed__Duplicate1(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private BooleanValue funcIsRing(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}
	
    // 4.3.1 LineString, Line, LinearRing (2)
	private IntegerValue funcNumPoints(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new IntegerValue(geo.getNumPoints());
	}

	private StringValue funcPointN(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		int n = Integer.parseInt(args[1].getStringValue());
		return new StringValue(wkt(((LineString) geo).getPointN(n)));
	}
	
    // 4.4 MultiLineString (2)
	private BooleanValue funcIsClosed__Duplicate2(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}
	
	private DoubleValue funcLength__Duplicate2(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}
	
    // 4.5 Surface (7)
	private DoubleValue funcArea__Duplicate1(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}

	private StringValue funcCentroid__Duplicate1(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}

	private StringValue funcPointOnSurface__Duplicate1(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}

	private IntegerValue funcNumPatches(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private Item funcPatchN(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private Item funcBoundingPolygons(Sequence[] args) throws XPathException {
        throw new Error("Function not implemented.");
	}

	private BooleanValue funcIsClosed__Duplicate3(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}

    // 4.6 Polygon (3)
	private StringValue funcExteriorRing(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new StringValue(wkt(((Polygon) geo).getExteriorRing()));
	}

	private IntegerValue funcNumInteriorRing(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		return new IntegerValue(((Polygon) geo).getNumInteriorRing());
	}

	private StringValue funcInteriorRingN(Sequence[] args) throws XPathException {
		Geometry geo = geo(args[0].getStringValue());
		int n = Integer.valueOf(args[1].getStringValue());
		return new StringValue(wkt(((Polygon) geo).getInteriorRingN(n)));
	}
	
    // 4.7 MultiSurface, MultiPolygon (3)
	private DoubleValue funcArea__Duplicate2(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}
	
	private DoubleValue funcCentroid__Duplicate2(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}
	
	private DoubleValue funcPointOnSurface__Duplicate2(Sequence[] args) throws XPathException {
		// See shared functions above
		return null;
	}
	
    private Geometry geo(String wkt) throws XPathException {
        Geometry geo = null;
        try {
            geo = new WKTReader().read(wkt);
        } catch (ParseException ex) {
        }
        if (geo == null) throw new XPathException(this.getExpression(0), "Unknown Geometry");
        return geo;
    }
    
    private String wkt(Geometry geo) {
        return new WKTWriter().write(geo);
    }
    
    private byte[] wkb(Geometry geo) {
        return new WKBWriter().write(geo);
    }

}
