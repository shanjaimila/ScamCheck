package com.scamcheck.dto;

import java.util.List;

public class IocCollectionDto {
    private List<IocItemDto> urls;
    private List<IocItemDto> emails;
    private List<IocItemDto> ipv4Addresses;
    private List<IocItemDto> sha256Hashes;

    public IocCollectionDto() {}

    public IocCollectionDto(List<IocItemDto> urls, List<IocItemDto> emails, List<IocItemDto> ipv4Addresses, List<IocItemDto> sha256Hashes) {
        this.urls = urls;
        this.emails = emails;
        this.ipv4Addresses = ipv4Addresses;
        this.sha256Hashes = sha256Hashes;
    }

    public List<IocItemDto> getUrls() { return urls; }
    public void setUrls(List<IocItemDto> urls) { this.urls = urls; }

    public List<IocItemDto> getEmails() { return emails; }
    public void setEmails(List<IocItemDto> emails) { this.emails = emails; }

    public List<IocItemDto> getIpv4Addresses() { return ipv4Addresses; }
    public void setIpv4Addresses(List<IocItemDto> ipv4Addresses) { this.ipv4Addresses = ipv4Addresses; }

    public List<IocItemDto> getSha256Hashes() { return sha256Hashes; }
    public void setSha256Hashes(List<IocItemDto> sha256Hashes) { this.sha256Hashes = sha256Hashes; }
}
