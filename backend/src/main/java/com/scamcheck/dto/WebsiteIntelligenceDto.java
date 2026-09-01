package com.scamcheck.dto;

import java.util.List;

public class WebsiteIntelligenceDto {
    private String url;
    private String host;
    private String scheme;
    private boolean isHttps;
    private String tld;
    private List<String> triggers;

    public WebsiteIntelligenceDto() {}

    public WebsiteIntelligenceDto(String url, String host, String scheme, boolean isHttps, String tld, List<String> triggers) {
        this.url = url;
        this.host = host;
        this.scheme = scheme;
        this.isHttps = isHttps;
        this.tld = tld;
        this.triggers = triggers;
    }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }

    public String getScheme() { return scheme; }
    public void setScheme(String scheme) { this.scheme = scheme; }

    public boolean isIsHttps() { return isHttps; }
    public void setIsHttps(boolean isHttps) { this.isHttps = isHttps; }

    public String getTld() { return tld; }
    public void setTld(String tld) { this.tld = tld; }

    public List<String> getTriggers() { return triggers; }
    public void setTriggers(List<String> triggers) { this.triggers = triggers; }
}
