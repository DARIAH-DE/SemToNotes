<?xml version="1.0" encoding="UTF-8"?>
<!-- @author: Jochen Graf -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="//xquery/builtin-modules">
    <xsl:element name="builtin-modules">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates/>
      <module uri="http://exist-db.org/xquery/geo" class="org.exist.xquery.modules.geo.GeoModule"/>
    </xsl:element>
  </xsl:template>
  <xsl:template match="@*|*|comment()" priority="-2">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>