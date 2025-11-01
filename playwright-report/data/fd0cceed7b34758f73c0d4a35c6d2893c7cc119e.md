# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]: MGNREGA Performance Dashboard
      - generic [ref=e6]:
        - link "Project Description" [ref=e7] [cursor=pointer]:
          - /url: /projects
          - text: Project Description
        - link "Official Website" [ref=e8] [cursor=pointer]:
          - /url: https://nrega.nic.in/netnrega/home.aspx
          - text: Official Website
        - button "language" [ref=e9] [cursor=pointer]:
          - img [ref=e10]
  - generic [ref=e13]:
    - heading "MGNREGA Performance Dashboard" [level=1] [ref=e14]
    - button "Detect my location" [ref=e16] [cursor=pointer]:
      - img [ref=e18]
      - text: Detect my location
    - generic [ref=e20]:
      - heading "Select your state" [level=6] [ref=e21]
      - generic [ref=e24]:
        - combobox "Search and select state..." [ref=e25]
        - button "Open" [ref=e27] [cursor=pointer]:
          - img [ref=e28]
        - group
    - generic [ref=e30]:
      - heading "Select your district" [level=6] [ref=e31]
      - generic [ref=e34]:
        - combobox "Search and select district..." [disabled] [ref=e35]
        - generic [ref=e36]:
          - button "Open" [disabled]:
            - img
        - group
    - button "View Dashboard" [disabled]
```